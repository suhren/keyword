import math
import collections

import pandas as pd
import regex as re
import nltk
from nltk.corpus import stopwords
from nltk.collocations import BigramCollocationFinder, TrigramCollocationFinder, QuadgramCollocationFinder
from nltk.metrics import BigramAssocMeasures, TrigramAssocMeasures, QuadgramAssocMeasures


STOP_WORDS = stopwords.words('english')
POS_NOUN = ('NN', 'NNS', 'NNP', 'NNPS')
POS_NOUN_ADJ = ('JJ', 'JJR', 'JJS', 'NN', 'NNS', 'NNP', 'NNPS')

RE_ALPH = re.compile(r"^[a-zA-Z']+$")
RE_POSS = re.compile(r"('s|s')$")

def filter_min_char(word, n):
    return len(word) >= n
    
def filter_max_char(word, n):
    return len(word) <= n
    
def filter_unigrams(word):
    tags = nltk.pos_tag([word])
    return tags[0][1] in POS_NOUN and word not in STOP_WORDS

def filter_bigrams(ngram):
    for word in ngram:
        if word in STOP_WORDS:
            return False
    tags = nltk.pos_tag(ngram)   
    return tags[1][1] in POS_NOUN

def filter_trigrams(ngram):
    tags = nltk.pos_tag(ngram)   
    return tags[0][1] in POS_NOUN_ADJ and tags[2][1] in POS_NOUN_ADJ

def filter_quadgrams(ngram):
    tags = nltk.pos_tag(ngram)   
    return tags[0][1] in POS_NOUN_ADJ and tags[3][1] in POS_NOUN_ADJ


class ProcessError(Exception):
    pass


def process(text: str,
            num_ngram: list = [100, 100, 100, 100],
            min_char: int = 3,
            max_char: int = 30):
    
    # Split text into separate lines by newline characters
    lines = text.splitlines(keepends=False)

    re_ws = re.compile(r'\s+')

    # Replace all whitespace character like \t and \s with a single space
    lines = [re_ws.sub(' ', line) for line in lines]

    # Split into sentences
    sentences = [sent for line in lines for sent in nltk.sent_tokenize(line)]

    sentence_counter = collections.Counter()

    for sent in sentences:
        sentence_counter[sent] += 1

    sentences = [sent for sent in sentences if sentence_counter[sent] == 1]

    #for sent, count in sentence_counter.most_common():
    #    print(count, sent)

    # Tokenize each sentence
    re_split = re.compile("\s|(?<!\d)[,.](?!\d)")
    sentences = [re_split.split(sent) for sent in sentences]

    # Filter out non-alphabetic tokens
    is_alpha = lambda word: RE_ALPH.match(word) is not None

    sentences = [[word.lower() for word in sent if (is_alpha(word) and len(word) > 1)] for sent in sentences]

    if len(sentences) == 0:
        raise ProcessError('Not enough words')
        
    # Filter out single-word sentences
    sentences = [sent for sent in sentences if len(sent) > 1]

    # Extract single words and remove possesives
    filtered_sentences = [[RE_POSS.sub('', word) for word in sent if word not in STOP_WORDS] for sent in sentences]

    if len(filtered_sentences) == 0:
        raise ProcessError('Not enough words')
    
    counter = collections.Counter()
    for sentence in filtered_sentences:
        for word in sentence:
            counter[word] += 1

    # score_fn:
    # raw_freq, student_t, chi_sq, likelihood_ratio, pmi

    res = [[], [], [], []]

    n1 = num_ngram[0]
    if n1:
        df1 = pd.DataFrame({'entry': counter.keys(), 'freq': counter.values()})
        df1 = df1.sort_values(by='freq', ascending=False)
        df1 = df1.head(500)
        df1 = df1[df1['entry'].map(lambda x: filter_unigrams(x))]
        if min_char is not None:
            df1 = df1[df1['entry'].map(lambda x: filter_min_char(x, min_char))]
        if max_char is not None:
            df1 = df1[df1['entry'].map(lambda x: filter_max_char(x, max_char))]
        if len(df1) > 0:
            res[0] = df1['entry'].iloc[:n1].tolist()

    n2 = num_ngram[1]
    if n2:
        bigrams = BigramCollocationFinder.from_documents(sentences) 
        tuples2 = bigrams.score_ngrams(BigramAssocMeasures.raw_freq)
        if tuples2:
            df2 = pd.DataFrame(tuples2, columns=['entry','score'])
            df2 = df2.sort_values(by='score', ascending=False)
            df2 = df2.head(500)
            df2 = df2[df2['entry'].map(lambda x: filter_bigrams(x))]
            df2['entry'] = df2['entry'].apply(' '.join)
            if min_char:
                df2 = df2[df2['entry'].map(lambda x: filter_min_char(x, min_char))]
            if max_char:
                df2 = df2[df2['entry'].map(lambda x: filter_max_char(x, max_char))]
            if len(df2) > 0:
                res[1] = df2['entry'].iloc[:n2].tolist()

    n3 = num_ngram[2]
    if n3:
        trigrams = TrigramCollocationFinder.from_documents(sentences) 
        tuples3 = trigrams.score_ngrams(TrigramAssocMeasures.raw_freq)
        if tuples3:
            df3 = pd.DataFrame(tuples3, columns=['entry','score'])
            df3 = df3.sort_values(by='score', ascending=False)
            df3 = df3.head(500)
            df3 = df3[df3['entry'].map(lambda x: filter_trigrams(x))]
            df3['entry'] = df3['entry'].apply(' '.join)
            if min_char:
                df3 = df3[df3['entry'].map(lambda x: filter_min_char(x, min_char))]
            if max_char:
                df3 = df3[df3['entry'].map(lambda x: filter_max_char(x, max_char))]
            if len(df3) > 0:
                res[2] = df3['entry'].iloc[:n3].tolist()

    n4 = num_ngram[3]
    if n4:
        quadgrams = QuadgramCollocationFinder.from_documents(sentences) 
        tuples4 = quadgrams.score_ngrams(QuadgramAssocMeasures.raw_freq)
        if tuples4:
            df4 = pd.DataFrame(tuples4, columns=['entry','score'])
            df4 = df4.sort_values(by='score', ascending=False)
            df4 = df4.head(500)
            df4 = df4[df4['entry'].map(lambda x: filter_quadgrams(x))]
            df4['entry'] = df4['entry'].apply(' '.join)
            if min_char:
                df4 = df4[df4['entry'].map(lambda x: filter_min_char(x, min_char))]
            if max_char:
                df4 = df4[df4['entry'].map(lambda x: filter_max_char(x, max_char))]
            if len(df4) > 0:
                res[3] = df4['entry'].iloc[:n4].tolist()
    
    message = f'Found [{len(res[0])}] 1-grams, [{len(res[1])}] 2-grams, [{len(res[2])}] 3-grams, and [{len(res[3])}] 4-grams'
    return res, message