import typing as t
import collections

import pandas as pd
import regex as re
import nltk
from nltk.corpus import stopwords
from nltk.metrics import BigramAssocMeasures, \
                         TrigramAssocMeasures, \
                         QuadgramAssocMeasures
from nltk.collocations import BigramCollocationFinder, \
                              TrigramCollocationFinder, \
                              QuadgramCollocationFinder


# NLTK Stop words of common, usually uninformative words in english
STOP_WORDS = stopwords.words('english')
# NLTK Part-of-speec specifiers for nouns
POS_NOUN = ('NN', 'NNS', 'NNP', 'NNPS')
# NLTK Part-of-speec specifiers for nouns and adjectives
POS_NOUN_ADJ = ('JJ', 'JJR', 'JJS', 'NN', 'NNS', 'NNP', 'NNPS')

# Regular expression matching alphabetic tokens
RE_ALPHA = re.compile(r"^[a-zA-Z']+$")
# Regular expression matching possesive suffixes
RE_POSS = re.compile(r"('s|s')$")
# Regular expression matching whitespaces
RE_SPACE = re.compile(r'\s+')
# Regular expression matching delimiters for tokenization
RE_TOKEN = re.compile(r"\s|(?<!\d)[,.](?!\d)")


def filter_min_char(word, n):
    return len(word) >= n
    

def filter_max_char(word, n):
    return len(word) <= n
    

def filter_1_grams(ngram):
    """
    Select tokens considered useful in a 1-gram.
    We require that the part-of-speach of the token is a noun,
    and that the token is not a stop word.
    """
    tags = nltk.pos_tag(ngram)
    return tags[0][1] in POS_NOUN and ngram[0] not in STOP_WORDS


def filter_2_grams(ngram):
    """
    Select tokens considered useful in a 2-gram.
    We require that the part-of-speach of the second token is a noun,
    and that the neither token is a stop word.
    """
    for word in ngram:
        if word in STOP_WORDS:
            return False
    tags = nltk.pos_tag(ngram)   
    return tags[1][1] in POS_NOUN


def filter_3_grams(ngram):
    """
    Select tokens considered useful in a 3-gram.
    We require that the part-of-speach of the first and third token are nouns
    or adjectives
    """
    tags = nltk.pos_tag(ngram)   
    return tags[0][1] in POS_NOUN_ADJ and tags[2][1] in POS_NOUN_ADJ


def filter_4_grams(ngram):
    """
    Select tokens considered useful in a 4-gram.
    We require that the part-of-speach of the first and fourth token are nouns
    or adjectives
    """
    tags = nltk.pos_tag(ngram)   
    return tags[0][1] in POS_NOUN_ADJ and tags[3][1] in POS_NOUN_ADJ


def filter_token(token):
    """
    Filter out non-alphabetic, or short tokens
    """
    return RE_ALPHA.match(token) is not None and len(token) > 1


def get_sentences(text):
    # Split text into separate lines by newline characters
    lines = text.splitlines(keepends=False)
    # Replace all whitespace character like \t and \s with a single space
    lines = [RE_SPACE.sub(' ', line) for line in lines]
    # Split into sentences
    return [sent for line in lines for sent in nltk.sent_tokenize(line)]


def is_alpha(token):
    return RE_ALPHA.match(token) is not None


def filter_token(token):
    return  len(token) > 1 and token not in STOP_WORDS


def df_top(tuples: t.List[tuple],
           num: t.Optional[int] = None,
           min_char: t.Optional[int] = None,
           max_char: t.Optional[int] = None,
           token_filter: t.Optional[t.Callable] = None):
    
        df = pd.DataFrame(tuples, columns=['entry', 'score'])
        # Somewhat greedy, but only consider the top 500 tokens
        df = df.sort_values(by='score', ascending=False).head(500)
        if token_filter is not None:
            df = df[df['entry'].map(lambda x: token_filter(x))]
        df['entry'] = df['entry'].apply(' '.join)

        if min_char is not None:
            df = df[df['entry'].map(lambda x: filter_min_char(x, min_char))]
        if max_char is not None:
            df = df[df['entry'].map(lambda x: filter_max_char(x, max_char))]
        
        if len(df) > 0:
            return df.iloc[:num] if num is not None else df


def process(text: str,
            num_1_grams: int = 100,
            num_2_grams: int = 100,
            num_3_grams: int = 100,
            num_4_grams: int = 100,
            min_chars: int = 3,
            max_chars: int = 30):
    
    # Find all sentences in the text
    sents = get_sentences(text)

    # Filter out any sentences which occur identically more than once
    sent_counter = collections.Counter(sents)
    sents = [sent for sent in sents if sent_counter[sent] == 1]

    # Tokenize each sentence
    sents = [RE_TOKEN.split(sent) for sent in sents]

    # and len(word) > 1

    # Filter out non-alphabetic tokens and convert to lowercase
    sents = [[token.lower() for token in sent if is_alpha(token)] for sent in sents]

    # We look at two variants of the input sentences
    # a. For 1-grams, we remove all stopwords, short tokens, and possesives
    # b. For 2-grams and longer, we want to keep stopwords and short tokens as
    #    these might provide some information in relation to other words
    sents_a = [[RE_POSS.sub('', t) for t in sent if filter_token(t)] for sent in sents]
    sents_b = sents
    
    assert len(sents_a) > 0 and len(sents_b), 'Not enough words'
    
    counter = collections.Counter()
    for sent in sents_a:
        for token in sent:
            counter[token] += 1

    res = [[], [], [], []]

    if num_1_grams:
        # Represent tokens using a tuple with only one element to match the
        # format of the other ngrams with n > 1
        tuples = [((token, ), count) for token, count in counter.items()]
        df = df_top(tuples=tuples,
                    num=num_1_grams,
                    token_filter=filter_1_grams,
                    min_char=min_chars,
                    max_char=max_chars)
        if df is not None:
            res[0] = df['entry'].tolist()

    if num_2_grams:
        bigrams = BigramCollocationFinder.from_documents(sents_b) 
        tuples = bigrams.score_ngrams(BigramAssocMeasures.raw_freq)
        df = df_top(tuples=tuples,
                    num=num_2_grams,
                    token_filter=filter_2_grams,
                    min_char=min_chars,
                    max_char=max_chars)
        if df is not None:
            res[1] = df['entry'].tolist()

    if num_3_grams:
        trigrams = TrigramCollocationFinder.from_documents(sents_b) 
        tuples = trigrams.score_ngrams(TrigramAssocMeasures.raw_freq)
        df = df_top(tuples=tuples,
                    num=num_3_grams,
                    token_filter=filter_3_grams,
                    min_char=min_chars,
                    max_char=max_chars)
        if df is not None:
            res[2] = df['entry'].tolist()

    if num_4_grams:
        quadgrams = QuadgramCollocationFinder.from_documents(sents_b) 
        tuples = quadgrams.score_ngrams(QuadgramAssocMeasures.raw_freq)
        df = df_top(tuples=tuples,
                    num=num_4_grams,
                    token_filter=filter_4_grams,
                    min_char=min_chars,
                    max_char=max_chars)
        if df is not None:
            res[3] = df['entry'].tolist()

    return res