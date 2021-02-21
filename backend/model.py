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


def process(text, n=50):
    
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

    
    bigrams = BigramCollocationFinder.from_documents(sentences) 
    trigrams = TrigramCollocationFinder.from_documents(sentences) 
    quadgrams = QuadgramCollocationFinder.from_documents(sentences) 

    # score_fn:
    # raw_freq, student_t, chi_sq, likelihood_ratio, pmi

    df1 = pd.DataFrame({'entry': counter.keys(), 'freq': counter.values()})
    df1 = df1.sort_values(by='freq', ascending=False)
    df1 = df1.head(200)
    df1 = df1[df1['entry'].map(lambda x: filter_unigrams(x))]

    tuples2 = bigrams.score_ngrams(BigramAssocMeasures.raw_freq)
    df2 = pd.DataFrame(tuples2, columns=['entry','score'])
    df2 = df2.sort_values(by='score', ascending=False)
    df2 = df2.head(200)
    df2 = df2[df2['entry'].map(lambda x: filter_bigrams(x))]

    tuples3 = trigrams.score_ngrams(TrigramAssocMeasures.raw_freq)
    df3 = pd.DataFrame(tuples3, columns=['entry','score'])
    df3 = df3.sort_values(by='score', ascending=False)
    df3 = df3.head(200)
    df3 = df3[df3['entry'].map(lambda x: filter_trigrams(x))]

    tuples4 = quadgrams.score_ngrams(QuadgramAssocMeasures.raw_freq)
    df4 = pd.DataFrame(tuples4, columns=['entry','score'])
    df4 = df4.sort_values(by='score', ascending=False)
    df4 = df4.head(200)
    df4 = df4[df4['entry'].map(lambda x: filter_quadgrams(x))]
    
    res = []
    
    ratio = [0.7, 0.3, 0.0, 0.0]
    
    n1 = math.floor(ratio[0] * n)
    n2 = math.floor(ratio[1] * n)
    n3 = math.floor(ratio[2] * n)
    n4 = math.floor(ratio[3] * n)
    remainder = n - (n1 + n2 + n3 + n4)
    n1 += remainder
    

    r1 = df1['entry'].iloc[0:n1].tolist()
    r2 = df2['entry'].iloc[0:n2].apply(' '.join).tolist()
    r3 = df3['entry'].iloc[0:n3].apply(' '.join).tolist()
    r4 = df4['entry'].iloc[0:n4].apply(' '.join).tolist()

    res += r1
    res += r2
    res += r3
    res += r4
    
    message = f'Found [{len(r1)}] one-grams, [{len(r2)}] two-grams, [{len(r3)}] three-grams, and [{len(r4)}] four-grams'
    return res, message