import spacy
from typing import List, Tuple

# 加载英文的中等大小的模型
nlp = spacy.load('en_core_web_md')

# 将一组词转换为词向量的平均值
def get_average_vector(words: List[str]):
    vectors = [nlp(word).vector for word in words]
    return sum(vectors) / len(vectors)

# 根据任务描述词和句子计算语义相似度
def sentence_similarity(task_description: List[str], sentence: str):
    task_vector = get_average_vector(task_description)
    sentence_vector = nlp(sentence).vector
    similarity = nlp(task_vector).similarity(nlp(sentence_vector))
    return similarity

# 对句子根据与任务描述的语义相似度进行排序
def sort_sentences_by_similarity(task_description: List[str], sentences: List[str]) -> List[Tuple[str, float]]:
    sentence_scores = [(sentence, sentence_similarity(task_description, sentence)) for sentence in sentences]
    sorted_sentences = sorted(sentence_scores, key=lambda x: x[1], reverse=True)
    return sorted_sentences

# 示例用法
task_description_words = ['dog', 'park']
sentences_to_compare = [
    "A dog running in the park.",
    "A cat is sleeping on the couch.",
    "Children are playing with a dog.",
    "There are many dogs in the dog park."
]

# 获取排序后的句子列表
sorted_sentences_with_scores = sort_sentences_by_similarity(task_description_words, sentences_to_compare)

# 打印结果
for sentence, score in sorted_sentences_with_scores:
    print(f"Similarity: {score:.4f} | Sentence: {sentence}")
