const SITE_DATA = {
  "bio": [
    "Hi! This is Tianyi Chen. I am a second-year PhD student in Mechanical Engineering at Beihang University, Beijing, advised by <a href=\"https://shi.buaa.edu.cn/junzhang/en/index.htm\" target=\"_blank\">Prof. Jun Zhang</a>.",
    "Previously, I received my B.Eng. in Mechanics from Beihang University (<a href=\"http://www.moe.gov.cn/srcsite/A15/moe_776/s3258/202001/t20200115_415589.html\" target=\"_blank\">plan for strengthening basic academic disciplines</a>). I then continued my graduate study at Beihang and transferred to the PhD program in 2025. During my undergraduate, I have been fortunate to work with <a href=\"https://shi.buaa.edu.cn/08548/en/index.htm\" target=\"_blank\">Prof. Liang Zhang</a> at the School of Computer Science and Engineering, Beihang University. During that time, I studied how grading strategies and algorithmic systems could be designed to improve open-ended programming courses. This was my first experience of turning a loosely defined real-world problem into something that could be formalized, modeled, and evaluated computationally.",
    "My current research focuses on physical AI and symbolic regression. I am broadly interested in how modern AI algorithms can be designed or adapted to help us understand scientific systems, rather than merely predict them. My recent work has focused on discovering interpretable mathematical equations from multidimensional physical data, especially in fluid mechanics, where I am interested in problems such as multiscale modeling and the emergence of macroscopic descriptions from microscopic or mesoscopic dynamics.",
    "In the future, I hope to explore scientific discovery beyond the conventional “data-to-equation” paradigm. I am therefore particularly interested in physical representation learning and AI systems that can identify useful scientific representations, formulate interpretable hypotheses, and iteratively test and refine them against simulation or experimental evidence."
  ],
  "education": [
    {
      "school": "Beihang University",
      "logo": "assets/brand/beihang-emblem.jpg",
      "degree": "Ph.D. in Mechanical Engineering",
      "time": "Sep. 2024 – present"
    },
    {
      "school": "Beihang University",
      "logo": "assets/brand/beihang-emblem.jpg",
      "degree": "B.Eng. in Mechanics",
      "time": "Sep. 2020 – Jun. 2024"
    }
  ],
  "news": [
    {
      "date": "Aug. 2026",
      "html": "Oral presentation at the <b>14th National Conference on Fluid Mechanics</b>, Qingdao, China."
    },
    {
      "date": "Jul. 2026",
      "html": "Oral presentation at the <b>World Congress on Computational Mechanics (WCCM 2026)</b>, Munich, Germany."
    },
    {
      "date": "Jul. 2025",
      "html": "Our paper <a href='https://doi.org/10.1017/jfm.2025.10710' target='_blank'><i>Symbolic identification of tensor equations in multidimensional physical fields</i></a> was published in the <b>Journal of Fluid Mechanics</b> (vol. 1024, A34)."
    }
  ],
  "contact": {
    "html": "I'm always happy to discuss potential collaborations. Please send me a brief email describing the topic you would like to discuss. Once we have determined a time when we are both free, we can conduct an online meeting. Of course, if you are based in Beijing, you are welcome to schedule an offline coffee talk with me!"
  },
  "publications": [
    {
      "year": 2026,
      "title": "PAStudio: A Peer Assessment Pedagogical Tool for Open-ended Assignments",
      "authors": "Liang Zhang, Yue Zong, <b>Tianyi Chen</b>, Yan Ma, Jiangyiyang Zhu, Jing Li, and Lijun Zhang",
      "venue": "ACM Transactions on Computing Education, 26(4)",
      "links": [
        [
          "Paper",
          "https://doi.org/10.1145/3811024"
        ]
      ],
      "image": "assets/pub/pastudio-2026.png"
    },
    {
      "year": 2025,
      "title": "Symbolic identification of tensor equations in multidimensional physical fields",
      "authors": "<b>Tianyi Chen</b>, Hao Yang, Wenjun Ma, and Jun Zhang",
      "venue": "Journal of Fluid Mechanics, 1024, A34",
      "links": [
        [
          "Paper",
          "https://doi.org/10.1017/jfm.2025.10710"
        ],
        [
          "Preprint",
          "https://arxiv.org/abs/2507.01466"
        ],
        [
          "GitHub",
          "https://github.com/BUAA-MARS-group/SITE"
        ]
      ],
      "image": "assets/pub/jfm-2025-site.png"
    },
    {
      "year": 2024,
      "title": "A Peer Grading Approach for Open-ended Programming Projects Based on Binary System and Swiss System",
      "authors": "Liang Zhang*, <b>Tianyi Chen</b>*, Yue Zong, and Xiaopeng Gao",
      "note": "* Equal contribution",
      "venue": "ACM SIGCSE 2024, pp. 1484–1490",
      "links": [
        [
          "Paper",
          "https://doi.org/10.1145/3626252.3630767"
        ]
      ],
      "image": "assets/pub/sigcse-2024.png"
    },
    {
      "year": 2023,
      "title": "Research to Practice of Blended Learning in Computer Programming Course",
      "authors": "Liang Zhang, <b>Tianyi Chen</b>, Yue Zong, and Lijun Zhang",
      "venue": "IEEE FIE 2023",
      "links": [
        [
          "Paper",
          "https://doi.org/10.1109/FIE58773.2023.10342940"
        ]
      ],
      "image": "assets/pub/fie-2023-blended.png"
    },
    {
      "year": 2023,
      "title": "A Peer Review Approach to Grading Projects in Computer Courses",
      "authors": "Liang Zhang, Yue Zong, <b>Tianyi Chen</b>, Yafeng Ma, Shuo An, and Lijun Zhang",
      "venue": "IEEE FIE 2023",
      "links": [
        [
          "Paper",
          "https://doi.org/10.1109/FIE58773.2023.10343176"
        ]
      ],
      "image": "assets/pub/fie-2023-review.png"
    },
    {
      "year": 2022,
      "title": "An Online Learning Help Approach Based on Q&A Sites in Programming Course",
      "authors": "Liang Zhang, <b>Tianyi Chen</b>, Yafeng Ma, and Jianwei Niu",
      "venue": "IEEE TALE 2022, pp. 31–37",
      "links": [
        [
          "Paper",
          "https://doi.org/10.1109/TALE54877.2022.00014"
        ]
      ],
      "image": "assets/pub/tale-2022.png"
    }
  ],
  "posts": [
    {
      "title": "论文阅读——用epiplexity来度量数据的认知复杂度",
      "date": "2026-05-28",
      "tags": [
        "表征学习"
      ],
      "excerpt": "这篇论文很值得一读，由于最近很忙，所以先把之前写的第一部分post出来。这部分当时应该是参考了一个博主写的推送，启发很大，摘出来了我感兴趣的部分并加入了我的部分理解。后续应该还会有该方面的第二部分。这篇论文加上saini",
      "content": "[Entropy to Epiplexity: Rethinking Information for Computationally Bounded Intelligence](https://arxiv.org/pdf/2601.03220)\n\n这篇论文很值得一读，由于最近很忙，所以先把之前写的第一部分post出来。这部分当时应该是参考了一个博主写的[推送](https://mp.weixin.qq.com/s/RfroCWjb-nBOsEXNumAi-w)，启发很大，摘出来了我感兴趣的部分并加入了我的部分理解。后续应该还会有该方面的第二部分。这篇论文加上saining的[podcast](【对谢赛宁的7小时马拉松访谈：世界模型、逃出硅谷、反OpenAI、AMI Labs、两次拒绝Ilya、杨立昆、李飞飞和42】 https://www.bilibili.com/video/BV1tew5zVEDf/?share_source=copy_web&vd_source=0d8ad99fdd9c0fbacc16ee9eb5ad0f9e)让我重新思考了physical AI这个问题，我认为真正可能改写范式的是**Physical Representation Learning**，而非**Physics-Informed ML**。\n\n回到正题，本论文探讨了大型 AI 模型如何通过数据获取知识，并提出了**外延复杂度/认知复杂度**（Epiplexity）这一核心概念，用以衡量计算受限的观察者从数据中提取出的结构化信息。\n\n论文认为，传统的香农熵和算法信息论在解释现代大模型行为时存在局限，因而通过引入计算边界，揭示了信息、计算与泛化性能之间的深刻联系。论文中分析了三个信息论悖论，说明了数据顺序、确定性演化以及预测过程如何产生出超出原始数据生成机制的复杂结构。通过对国际象棋、图像及自然语言数据的实证研究，证明了Epiplexity能有效预测模型的分布外（OOD）泛化能力。\n\n该研究为理解涌现现象提供了理论框架，并指出数据筛选的重点应从单纯降低损失转向最大化可复用的结构化信息。最终，这一视角为评估预训练数据的质量和指导合成数据的生成提供了全新的度量标准。 \n\n## 两种信息\n\n论文里区分了两种信息：随机信息和结构信息。\n\n想象你拿到两个文件。文件 A 是一串随机密码：`x7K#mQ9$pL2@`。文件 B 是一段实现快速排序的 Python 代码。\n\n从传统信息论角度，文件 A 的信息量可能更大，因为它更不可预测。但直觉告诉我们，文件 B 更有价值。你能从中学到分治思想，理解递归结构，甚至迁移到其他排序问题。\n\n随机密码只有「熵」，没有「结构」。你记住了这个密码，但这个记忆对理解其他密码毫无帮助。快速排序的代码虽然可以压缩，但它包含了可以迁移的模式。\n\n这个区分很重要。因为它意味着信息的价值不在于「不可预测性」，而在于「可学习的结构」。\n\n伪随机数生成器是个极端例子。对多项式时间观察者来说，它的输出具有近乎最大的熵，看起来完全随机。但它的 epiplexity 接近零，因为你学不到任何可以迁移的结构。相反，模拟一个动力系统，比如 Lorenz 方程，虽然规则简单，但会产生高 epiplexity 的数据，你可以学到吸引子、混沌边缘这些涌现的结构。\n\n## 推理是被逼出来的\n\n涌现之外，论文还讨论了一个更有意思的现象：推理。\n\nIlya Sutskever 有个绝妙的比喻。想象你在读一本推理小说，读到某一页，文本即将揭示凶手的名字。如果一个语言模型能准确预测出这个名字，那它一定是从前文的线索中推断出了谁是凶手。\n\n但写这本书的作者呢？作者不需要做这个推理。作者是先选定了凶手，然后倒过来编织线索。\n\n这里有个深刻的不对称：生成过程是「从因到果」，简单直接。但预测过程是「从果到因」，需要归纳推理。\n\n论文把这叫做「归纳」（Induction）。数据的生成者不需要做归纳，但数据的学习者必须做。而归纳的计算成本，可以远远超过生成的计算成本。\n\n这就解释了一个一直困扰很多人的问题：为什么「预测下一个词」这么简单的训练目标，能让模型产生逻辑推理能力？\n\n因为要准确预测下一个词，模型有时候必须做归纳推理。它必须从已有的线索中推断出隐藏的结构，才能做出正确的预测。推理不是被「教」出来的，而是被预测任务「逼」出来的。\n\n论文用细胞自动机做了验证。他们故意遮住输入的一部分比特，让模型从剩余信息和输出中反推被遮住的内容。结果发现，模型需要的计算量随着被遮住的比特数指数增长。归纳的代价是指数级的，而演绎的代价是多项式级的。\n\n这个发现的意义在于：模型学到的东西，可以远远超过数据生成过程的复杂度。因为学习者被迫做了生成者不需要做的归纳推理，而这些推理能力一旦学到，就可以迁移到其他任务。\n\n## 数据选择的新范式\n\n这个框架对 AI 研究有个直接的启示：数据选择比我们想象的重要得多。\n\n在 AI 时代早期，大家关注的是「有没有数据」。后来关注「数据质量」，比如人工标注是否准确。但更本质的问题是：对于你的模型，什么样的数据包含最多可学习的结构？\n\n这个问题没有通用答案。高质量的代码数据，对训练编程助手很有价值，但对训练聊天机器人可能价值有限。关键是匹配：数据的结构复杂度，要略高于模型当前的提取能力，但又不能高太多。\n\n论文里有个实验结果特别反直觉。他们用同样的计算预算，分别测量了文本（OpenWebText）、棋谱（Lichess）和图像（CIFAR-5M）三种数据的 epiplexity。\n\n结果是：图像数据的总信息量最大，但 epiplexity 最低。超过 99% 的图像信息是「随机的」，比如具体像素值的不可预测性。而文本数据虽然总信息量不是最大的，但 epiplexity 远远高于图像。\n\n这解释了 AI 圈一个长期的困惑：为什么 LLM 通过海量文本训练就能产生极强的通用泛化能力，能迁移到机器人控制、定理证明、时间序列预测等完全不同的领域，而早期的计算机视觉模型吃了几十亿张图片，却依然只能做分类和检测？\n\n不是因为文本包含更多信息，而是因为文本中可学习的结构占比远远更高。语言天然具有长程依赖、组合性、抽象推理结构，这些都是高 epiplexity 的来源。而图像的大部分信息量被像素级的噪音占据了。\n\n有意思的是，当他们对图像做 VQ tokenization（把像素压缩成离散的语义 token）之后，图像的 epiplexity 显著提升。因为 tokenization 过程滤掉了像素级的噪音，让模型能够聚焦于更高层的语义结构。\n\n这也许解释了为什么最近的多模态模型越来越倾向于把所有模态都转换成 token 序列。不是因为 Transformer 只能处理序列，而是因为 tokenization 本身就是一个提升 epiplexity 的过程。\n\n维果茨基提出过「最近发展区」的概念：学习最有效的区域，是学习者当前能力和潜在能力之间的区域。太简单的内容学不到新东西，太难的内容又理解不了。\n\n## 物理数据的epiplexity\n\n如果说 epiplexity 给语言模型训练提供了一个新的数据价值视角，那么它对 physical AI 的启发可能是：\n\n在物理系统中，原始观测往往同时包含两类东西：一类是不可迁移的细节，例如像素噪声、传感器误差、热涨落、网格伪影和单条混沌轨迹的相位信息；另一类是可迁移的结构，例如守恒律、对称性、因果关系、状态变量、尺度律、闭合关系和可组合的动力学机制。前者增加的是熵，后者才构成 epiplexity。真正有价值的物理数据，不一定是分辨率最高、规模最大或最接近真实世界的数据，而是那些能够迫使模型从观测中抽取可复用物理结构的数据。\n\n**高 epiplexity 的物理数据**不是“高分辨率”“高精度”“大规模”本身，而是那些迫使模型学到可复用物理结构的数据。例如，跨几何、跨边界条件、跨 Reynolds/Mach/Knudsen 数、跨材料参数的流体或分子模拟；从稀疏观测反推压力场、应力场、隐变量、边界条件或本构关系的逆问题数据；从微观 MD 轨迹中提取宏观状态变量、reaction coordinates、order parameters、transport coefficients 的多尺度数据；包含 action/intervention 的 embodied physics 数据，比如机器人推、抓、碰撞、滑动后的视觉—触觉—力觉—位姿序列。这些数据的共同点是：生成过程可能很简单，但对学习者来说，预测或压缩它们需要建立隐藏的状态表征、因果结构、对称性、守恒律和闭合关系。\n\n**低 epiplexity 的物理数据**也不等于“简单数据”。它可能非常大、非常高维、甚至 Shannon 熵很高，但主要是不可迁移的随机性或捷径。例如，单一几何、单一参数、单一初边值条件下的大量 CFD snapshot，模型可能只学到插值；超高分辨率湍流或 MD 轨迹中的微观热噪声和相位细节，对许多宏观任务并无可复用结构；被传感器噪声、网格伪影、数值耗散、渲染纹理主导的数据；或者标签/格式中存在捷径（shortcut），使模型不必学习物理机制就能降低 loss。\n\nEpiplexity这个概念对Physical AI研究的启发应该是：模型不只是学习更多物理规律，而是学习什么样的表征能让物理规律显现出来。这也是我认为为什么Physics-Informed ML一定会逐渐过渡到Physical Representation Learning，Physics-Informed ML 试图让模型服从物理，而Physical Representation Learning 试图让模型发现“物理应当以什么形式被表示”。\n\n这就像早期的专家系统和如今的LLM的对比，专家系统执着于制定规则让模型遵从，而LLM通过设计让模型学习到了语言的表征，迫使模型理解了**语义**，从而自然而然的能解决大量OOD问题。\n\n所以，真正能够理解物理规律的所谓世界模型，其核心目标肯定不是把已有物理规律作为先验塞进模型，而是学习一种表征，使得原始观测中的物理结构从噪声和细节中浮现出来。在好的表征下，复杂的高维物理现象应当被压缩为更少的状态变量、更稳定的因果关系、更清晰的对称性和更可迁移的动力学规律。"
    },
    {
      "title": "科研随笔——用RLHF重新思考符号回归中的可解释性",
      "date": "2026-04-10",
      "tags": [
        "符号回归",
        "可解释性",
        "RLHF"
      ],
      "excerpt": "符号回归大家都耳熟能详了：它不仅要拟合数据，还要吐出一个人可以读、可以想、甚至可以进一步拿去推导的方程。也正因为这个承诺，复杂度（complexity）几乎成了这个领域最常见的第二目标。除了拟合误差，我们通常还会最小化树",
      "content": "# 1. 符号回归中的“复杂度”与“可解释性”：一个经常被默认、却并不稳固的等号\n\n符号回归大家都耳熟能详了：它不仅要拟合数据，还要吐出一个人可以读、可以想、甚至可以进一步拿去推导的方程。也正因为这个承诺，**复杂度（complexity）**几乎成了这个领域最常见的第二目标。除了拟合误差，我们通常还会最小化树大小、节点数、运算符数量、带权运算符数量，或者干脆做一个 accuracy-complexity 的 Pareto front。这个做法并不奇怪，因为表达式短一些、浅一些、少几层嵌套，通常确实更容易看。\n\n但这里有一个默认前提：**复杂度可以作为可解释性的代理。** 根据Occam's Razor原则，这个前提大多数时候是成立的，但并不严格。一个式子更短，不等于它更容易被人理解；一个式子包含更少的节点，也不意味着它更接近人类科学建模时偏好的形式。尤其在物理问题里，这个落差其实非常明显。一个包含少量三角、指数或嵌套分式的表达式，树长可能不大，但读起来可能非常拧；反过来，一个稍长的多项式、无量纲组合或者分层展开式，虽然节点更多，却往往更符合人的推理习惯。\n\n因此，我觉得符号回归里“复杂度”这个概念可以分成三层来看。\n\n第一层是**纯语法复杂度**。这类定义最常见，也最便宜。树大小、节点数、operator count 都属于这一类。它们的优点非常明显：稳定、通用、实现简单、适合直接放到搜索过程中做 regularization 或 Pareto optimization。SRBench 一类工作最终采用的也是这种偏统一、偏工程的复杂度指标，因为它足够可复现，方便跨算法比较。\n\n第二层是**轻语义复杂度**。这类做法承认不同算子带给人的负担并不一样，因此尝试给函数符号加权。例如加减乘除、幂、log、exp、三角函数并不等权。Kommenda 等人的工作就明确讨论过：单纯的 size-related complexity 只描述表达式树的形状，而不能反映表达式内部运算的“认知难度”，所以可以加入对函数符号的语义区分。PSE 这篇工作在实现中采用的，也正是这种精神：表面上说是“operator 数量的 proxy”，实际代码里却已经是带权运算符复杂度了。\n\n第三层才是我真正关心的：**人类可解释性本身。** 这件事并不是一个纯语法对象。人类在看一个公式时，会自然地受到许多因素影响：它是否容易心算或局部模拟，它是否可以分解成几个彼此可命名的块，它是否包含过多非算术操作，它是否反复嵌套某类函数，它是否和该领域常见的理论结构相似。换句话说，人类并不是在“数节点”，而是在“读结构”。\n\nVirgolin 等人 2020 年的一篇工作，正是试图解决这个问题。他们没有再假设“size 越小越可解释”，而是反过来问：**能不能直接从人的反馈里学一个 interpretability proxy？** 他们设计了一个关于数学公式的问卷，围绕 simulatability 和 decomposability 两种常见的 proxy of human interpretability 收集数据，再用学习到的模型去估计一个公式的人类可解释性，并把这个模型嵌回多目标遗传编程中。这个思路在我看来很重要，因为它至少说明了一件事：在符号回归里，我们其实不必把“复杂度”永远当成不可动摇的手工先验；它完全可以是一个**被学习的偏好函数**。\n\n所以，我们接下来要考虑的就不再是“什么复杂度定义最合理”，而是：**人到底偏好什么样的公式？这个偏好能否被学习并在搜索中施加？**\n\n从这个角度看，树大小、运算符数量、带权复杂度，都更像是一种廉价的、静态的、预先写死的 proxy。它们的价值在于便宜，不在于真实。它们可以作为起点，但未必适合作为终点。\n\n# 2. RLHF\n\n在LLM的Post-training领域，经常用到一种名为**RLHF**（Reinforcement Learning from Human Feedback，基于人类反馈的强化学习）的微调技术。\n\n在强化学习的传统设定里，我们默认任务目标已经被清晰地写成了奖励函数。可现实里恰恰有很多目标不是这样。\n\n早在2017年，Christiano 等人指出：许多任务的目标复杂、含糊、难以精确定义，手写 reward 往往会造成“奖励函数被优化了，但真正想要的行为没有出现”。于是他们不再要求人直接写出 reward，而是让人去比较两段行为片段哪个更符合偏好，再用这些比较数据训练 reward model，最后让策略去优化这个 learned reward。\n\n这个框架后来在大语言模型里被真正普及开来。InstructGPT 那篇工作给出了一条现在大家都很熟悉的流程：先做监督微调（SFT），拿到一个基本会“按要求回答”的初始策略；然后让标注者对多个回答做排序，训练一个 reward model；最后再用 PPO 之类的 RL 方法去优化语言模型，使它更符合人类偏好。这里最重要的思想是：**当目标无法被显式写出时，可以先收集偏好，再学习奖励，再优化策略。**\n\n这不正是我们想要的吗？这套思想在符号回归里同样适用：我们不必把“可解释性”这个目标硬塞进一个手写的复杂度函数里，而是可以直接从人对候选公式的偏好中学一个 interpretability reward model，再让符号生成器去优化这个 learned reward。\n\n# 3. 从 Virgolin 的 proxy 出发：能不能用 RLHF 去约束符号回归中的可解释性？\n\n## 3.1 为什么这个方向是自然的\n\n先看 Virgolin 的工作到底做了什么。它其实已经完成了 RLHF 思路中最关键的一半：**从人类反馈学习一个偏好代理。** 只不过它当时并不是沿着“alignment”这套叙事来讲，而是沿着“interpretable symbolic regression”去讲。它的核心逻辑是：\n\n1. 让人对公式的可解释性相关属性作出反馈；\n2. 用这些反馈拟合一个可解释性 proxy；\n3. 把这个 proxy 嵌入搜索过程，替代简单的 size minimization。\n\n这和 RLHF 的结构已经非常相似了。差别主要在于：\n\n- Virgolin 的 proxy 更像一个静态评估器，主要作为多目标优化中的第二目标；\n- RLHF 则更强调“偏好—奖励—策略更新”的闭环，把 learned preference 直接用于改变生成分布。\n\n能否把 Virgolin 那种静态 proxy，升级为一个真正参与公式生成过程的偏好学习框架？\n\n## 3.1 一个可能的总体框架\n\n### 第一层：先把问题表述成 preference learning，而不是 complexity engineering\n\n这一步最重要。我们不再手写一个固定复杂度函数，而是让标注者在同一任务、相近精度的前提下，对两个候选公式回答一个更自然的问题：\n\n- 哪个更容易理解？\n- 哪个更像你愿意写进论文的最终公式？\n- 哪个更容易手工推演、讲给别人听、或者映射到已有理论？\n\n这里一定要强调“在相近精度下”进行比较，否则人会被拟合误差主导，偏好数据会退化成“谁更准就选谁”。换句话说，**我们要学的是在 accuracy 已经基本过关之后，人对公式结构的偏好。**\n\n这一步甚至不一定要求标注者给分数。我反而觉得 pairwise preference 更可靠，因为“7 分和 8 分的差别是什么”很难说清，但“这两个里面哪个更顺眼”通常容易得多。\n\n### 第二层：学一个 task-conditioned 的 interpretability model\n\n我不太赞成只输入公式本身。因为公式是否好理解，经常是**任务相关**的。\n\n举个简单例子：\n\n- 在控制、流体、传热里，无量纲群往往很自然；\n- 在某些经验建模问题里，分段、饱和、阈值结构可能更符合人的先验；\n- 在基础物理里，某些三角或指数形式并不难懂，甚至比高阶多项式更自然。\n\n所以，一个更合理的偏好模型，输入不该只有 expression tree，还应包括任务上下文，例如变量名、量纲、物理语义标签、是否已经无量纲化、误差水平、甚至候选公式所在的 Pareto 邻域。也就是说，我们要学的可能不是单纯的 $p(\\text{interpretable}\\mid f)$，而是 $p(\\text{preferred}\\mid f, \\mathcal{T})$。\n\n这一步其实比“复杂度定义”前进了一大步：复杂度通常是假设全任务共享一套静态标尺，而偏好模型允许不同任务、不同学科对“好公式”的判断不同。\n\n### 第三层：再决定如何把偏好注入生成器\n\n这时就出现三条路线。\n\n第一条，最像经典 RLHF。训练一个 reward model，分数反映公式在当前任务下的可解释性偏好，然后把公式生成器当成 policy 去优化。生成器可以是序列模型、树生成模型、MCTS、遗传编程，甚至某种 grammar-guided sampler。只要它能产出候选公式，并支持基于 reward 改变采样分布，就能接进去。\n\n第二条，更像 DPO。直接对同一任务下的好/坏公式对进行优化，让生成器提高偏好公式的概率，降低不被偏好的公式概率，而不显式训练 reward model。这个方案对深度生成式符号回归尤其合适，因为它更像“语言模型偏好对齐”的公式版。\n\n第三条，更像 RLAIF。先写一套比较明确的“公式宪法”，再让辅助模型或规则系统产生部分比较信号。例如：\n\n- 避免连续三层以上非算术操作嵌套；\n- 优先选择可以拆成少量物理可命名模块的公式；\n- 在物理问题中优先保留量纲齐次或无量纲结构；\n- 对相同精度下的候选式，优先选择在局部极限下行为更可解释的表达；\n- 对可以符号化简到相同形式的候选，不奖励纯表面差异。\n\n这类方案的价值在于，它能显著降低人工标注成本，把少量高质量专家反馈扩展成较大规模的伪偏好数据。\n\n## 3.3 这个方向真正难的地方在哪里\n\n我觉得可行性是有的，但困难也很真实，而且并不只是“算力够不够”这么简单。\n\n### 难点一：可解释性不是绝对属性，而是关系属性\n\n一个公式的“好不好懂”往往取决于对谁而言、在什么任务里、和什么候选相比。对于熟悉傅里叶分析的人，正弦项不一定难；对于做热工关联式的人，某些经验指数关系反而很自然；而对另一类研究者，同样的形式可能完全陌生。\n\n这意味着我们最好学的是**偏好分布**，而不是一个试图放之四海而皆准的“绝对解释性分数”。如果做得更进一步，甚至可以考虑 personalized interpretability，也就是根据不同用户群体学习不同偏好模型。\n\n### 难点二：公式有等价性，偏好数据会被表示法污染\n\n数学表达式的一个麻烦在于，不同写法可能是同一个式子。比如因式分解前后、常数吸收前后、对数幂变换前后，表面长度和结构差别很大，但数学上几乎等价。如果不做 canonicalization 或符号化简，偏好学习很容易学到“排版习惯”而不是“结构偏好”。\n\n因此，这类系统必须把等价类处理当成核心基础设施，而不是后处理小修小补。至少要尽可能做符号化简、常数标准化、树结构规范化，最好还能对“可被局部代换解释为同一结构”的公式做聚类。\n\n### 难点三：人类反馈很贵，而且专家反馈更贵\n\n这也是为什么我不认为“完整人工 RLHF”会是第一步的最佳选择。符号回归的可解释性判断，经常需要一定数学或领域背景，不像一般文本偏好那样可以大规模众包。因此，更现实的路线可能是：\n\n- 先用 Virgolin 一类问卷数据或小规模专家数据得到第一版 proxy；\n- 再用主动学习，只对 reward model 最不确定的候选对请求人工比较；\n- 同时引入 constitution/rule-based feedback 扩充数据；\n- 最后只在关键任务上让专家做高价值校正。\n\n### 难点四：偏好约束可能和精度、发现真规律的目标发生冲突\n\n这是我觉得最需要警惕的一点。物理规律并不保证总是“人类第一眼觉得最顺眼”的。过强的可解释性偏好，可能会把搜索推向过度简单、过度教科书式的区域，反而错过真实但稍显复杂的结构。\n\n所以更合理的方式可能是：\n\n- 仍然保留 accuracy 或 evidence 作为硬约束或主目标；\n- 把可解释性当作在近似等精度模型之间做选择的偏好；\n- 用 KL 约束、Pareto front 或 constrained optimization 防止生成器为了迎合偏好而牺牲太多真实性。\n\n# 4. 参考\n\n1. Paul F. Christiano, Jan Leike, Tom B. Brown, Miljan Martic, Shane Legg, Dario Amodei. *Deep Reinforcement Learning from Human Preferences*. NeurIPS 2017.\n2. Long Ouyang, Jeff Wu, Xu Jiang, et al. *Training Language Models to Follow Instructions with Human Feedback*. NeurIPS 2022.\n3. Rafael Rafailov, Archit Sharma, Eric Mitchell, Stefano Ermon, Christopher D. Manning, Chelsea Finn. *Direct Preference Optimization: Your Language Model is Secretly a Reward Model*. NeurIPS 2023.\n4. Yuntao Bai, Saurav Kadavath, Sandipan Kundu, et al. *Constitutional AI: Harmlessness from AI Feedback*. 2022.\n5. Marco Virgolin, Andrea De Lorenzo, Eric Medvet, Francesca Randone. *Learning a Formula of Interpretability to Learn Interpretable Formulas*. PPSN 2020.\n6. Michael Kommenda, Andreas Beham, Michael Affenzeller, Gabriel Kronberger. *Complexity Measures for Multi-objective Symbolic Regression*. 2021.\n7. William La Cava, Patryk Orzechowski, Bogdan Burlacu, et al. *Contemporary Symbolic Regression Methods and their Relative Performance*. 2021."
    },
    {
      "title": "学习笔记——Agent的概念、原理与构建模式",
      "date": "2026-04-09",
      "tags": [
        "LLM",
        "Agent"
      ],
      "excerpt": "普通的LLM擅长回答问题，但也存在一个限制，那就是它们无法感知或者是改变外界环境。",
      "content": "# 1. 什么是Agent？\n\n普通的LLM擅长回答问题，但也存在一个限制，那就是它们**无法感知或者是改变外界环境**。\n\n比如，让GPT5-4写一段关于xxx的代码，它只能提供给你代码段，但具体生成代码文件、运行和测试代码文件的过程需要我们自己来做，也就是说，LLM无法改变外界环境。而如果当本地已经有部分代码，希望增加部分功能时，必须将本地的代码文件上传给LLM或者直接粘贴代码块，如果不主动告诉LLM，它是不可能知道我们的代码啥样的，这正是LLM无法感知外界环境的表现。\n\n一种解决这个问题的方案是让LLM使用对应的**工具（tools）**，例如让它可以读写文件内容、查看文件列表、运行终端命令，这样它就能完全自动化的构建代码项目。像这样把一个LLM和一堆工具组装起来，使其变成一个能改变或感知外界环境的程序，我们就称其为**Agent**。\n\nAgent是多样的，具体为不同的任务可以设计不同的Agent，例如编程Agent，cursor，用于办公和分析的Agent，Manus。\n\n# 2. Agent的运行模式\n\n## 2.1 ReAct模式\n\n**ReAct**全称为Reasoning and Acting，可能是目前使用最为广泛的Agent运行模式。该模式最早由姚顺雨（现在，也就是2026年在腾讯挂帅AI首席科学家）在ICLR 2023提出。\n\n![REAC T: SYNERGIZING REASONING AND ACTING IN LANGUAGE MODELS](..\\images\\Agent\\react.png)\n\n在该模式下，用户先提交任务，然后Agent做思考（thought），然后去判断是否调用工具，如果是，Agent将进行行动（action），然后观察（observation）行动的执行结果，随后继续进行思考，循环往复，直到Agent认为不再需要调用工具，可以直接给出结论了，则会输出最终答案（Final answer）。以上即为ReAct模式的流程。\n\n那么如何实现ReAct模式呢？简单来说，其实就是设计系统提示词。\n## 2.2 Plan and Execute模式\n\n从总体上看，这种模式遵循了先规划、再执行的流程。在整个流程中，粗粒度看只有两个关键角色，一个是用户，另一个是Plan-And-Execute Agent。这个PAE Agent由以下几个部分组成：首先是负责出执行计划的Plan model，然后呢，我们在运行的过程中，还需要一个能够根据每一步的执行结果来动态调整计划的Re-Plan model，负责修改执行计划，Plan model和Re-plan model可以是同一个模型负责两个部分，也可以是独立的两个模型，除此之外，我们还需要一个可以按照计划执行的模型，即执行Agent（这是一个子Agent），最后，我们需要一套主程序来把上述这些模型组织起来。\n\n具体来说，首先，用户会把问题提交给Agent主程序，Agent主程序接到这个指令后，会把这个指令发给Plan模型，让它给出具体的执行步骤；有了计划后，主程序会把计划传递给执行Agent，告诉他请执行第一步（这个执行Agent本身可以用上一节的ReAct模式来运行）；执行Agent会把执行结果反馈给Agent主程序，而主程序会把这些执行结果、执行记录和上一次的Plan都发给Re-Plan模型，让它生成一个新的执行计划；主程序会接受这个新的执行计划，并再一次将计划传递给执行Agent。重复该过程n次，直到Re-Plan模型认为结果已经得到，结束循环，返回答案给主程序。最终主程序将这个答案转发给用户。\n\n在整个过程中，执行记录是会一直边长的，即过去的记录会保留，而一般来说，执行计划是不断变化的，他会经过Plan model和Re-plan model一直更新。\n\n# 3. 运行模式的比较\n\nReAct模式的优势是，由于system prompt是你自己写的，约束是你自己加的，所以约束相对于整个prompt的嵌入就会很自然。自然的好处就是自定义空间很大，另外可以通过集中LLM的注意力来增强prompt的效果（这里有一个稍微复杂点的attention的问题，理解它对应用来讲不是很重要所以我就不细讲了），以及出了问题（例如LLM的返回不符合预期）后好找问题，回去读一遍自己写的prompt嘛。如果你有一些相对关键的约束，希望LLM可以严格执行的那种，也建议自己动手写进system prompt并且用语言着重强调，这是通过代码注册无法办到的。\n\nPlan and Execute模式的优势是tools list非常灵活，可以随时添加减少。这个优势在一些大型项目中比较有用，因为这两年流行的一种节省窗口的方式是根据对话需求先用一个小agent筛选工具，然后只将有用的工具提供给主agent（可以理解为你工具箱里有1000个各式各样的道具，你的用户说他想装修房子，先有个人从工具箱里挑了十几个工具出来，然后你抱着这十几个工具去找装修师傅去了）。这种情况下可以通过Python来随时结构tools list就非常有用，因为这意味着你不需要在system prompt里面通过string搞来搞去了（当然本质上就是langchain替你去搞这些了）。 \n\n简单来讲，第二种模式相当于是第一种模式的预制菜。如果第二种模式能满足你的需求，那么它的优势就是上手简单。但如果你使用第二种模式时遇到了某种瓶颈，无论是算力还是别的什么，你可以试试用第一种模式，说不定有奇效。\n\n## 4. 实践\n\n之后如果博主应该会抽时间做一系列小的Agent项目，这一部分待更新。\n\n## 参考\n\n[Agent 的概念、原理与构建模式 —— 从零打造一个简化版的 Claude Code]( https://www.bilibili.com/video/BV1TSg7zuEqR/?share_source=copy_web&vd_source=0d8ad99fdd9c0fbacc16ee9eb5ad0f9e)"
    },
    {
      "title": "善用SDD助力AI coding",
      "date": "2026-03-25",
      "tags": [
        "Agent",
        "SDD"
      ],
      "excerpt": "AI coding时下十分火爆，大家纷纷尝试claude code、codex、open code等AI编程工具加速开发，但使用这些工具时，抛开飞速跳跃的消耗token数不谈，一个很让人难受的点是AI工具一顿猛写，结果发",
      "content": "# 1. 什么是SDD？\n\nAI coding时下十分火爆，大家纷纷尝试claude code、codex、open code等AI编程工具加速开发，但使用这些工具时，抛开飞速跳跃的消耗token数不谈，一个很让人难受的点是AI工具一顿猛写，结果发现先出来的代码与自己的想法总是有偏差。而且，我们大部分科研人一般不会让AI从0开发，常见的需求一般是让AI结合已有框架或仓库做增量开发或功能修改，这时候AI工具被限制在了框框里（如果给AI从0开发的空间，有时候它甚至会表现得更好），往往会写出与原始代码风格完全不同的东西，很多功能倾向于另起炉灶，而这是我们不愿意看到的。\n\n那么，有没有什么方法让AI能像一个可靠的合作者一样，基于一套规范的开发流程，按照用户的要求在限制内做好二次开发呢？这里我们要引入一个叫做**SDD**（**Spec-Driven Development**）的方法论，也就是“规范驱动开发”。SDD的核心理念是先编写‌**结构化、可执行的规范**‌（Spec），再由AI生成代码，确保质量与可维护性。\n\n这里我记录一个帮助我们进行SDD的开源仓库[OpenSpec](https://github.com/Fission-AI/OpenSpec)，并使用codex做演示，介绍OpenSpec的常见功能。\n\n# 2. OpenSpec\n\nOpenSpec是一个轻量化的工具，可以辅助我们的coding agent生成规范的代码。每次提出新的需求前，它会先让agent按照一个工作流生成标准文档，用户审核这些文档后，再开始具体的代码编写工作。\n## 2.1 安装和初始化\n\n首先在全局安装OpenSpec：\n\n```bash\nnpm install -g @fission-ai/openspec@latest\n```\n\n可以用以下命令验证安装是否成功：\n\n```bash\nopenspec --version\n```\n\n然后进入工作目录，进行项目规范初始化：\n\n```bash\ncd your-project\nopenspec init\n```\n\n初始化成功如图所示，图中也展示了我们常用的几个命令：\n\n![初始化](..\\images\\Agent\\openspec.png)\n\n按enter选择工具，这里我们选择Codex，当然你也可以选择Claude Code或其他coding agent。\n\n初始化后，OpenSpec会在当前工作区根目录下创建一个文件夹`openspec`，其中会有两个子文件夹，分别是`spec`（放我们项目的规范）和`changes`(放每个正在进行的变更)。\n\n## 2.2 斜杠命令\n\n初始化好之后，我们就可以正常的在coding agent中使用斜杠命令来与OpenSpec进行交互了。\n\n正常使用命令唤起coding agent，这里我们使用`codex`唤起Codex，接下来就是使用以下命令告诉AI我们想实现的是什么了：\n\n```\n/opsx:propose <what-you-want-to-build>\n```\n\n这个命令会强制让agent进行思考，生成`design.md`, `proposal.md`, `task.md`这三个文件，分别是技术设计、提案和任务清单，此时我们要做的就是Review这些文档，有问题的地方直接修改，当然，我们也可以用自然语言告诉agent我们需要改什么，让他来修改这些文档。\n\n确定没问题后，运行：\n\n```\n/opsx:apply\n```\n\nAgent会按照`task.md`的指示去实习提案。\n\n# 3. 总结\n\n其实OpenSpec做的事非常简单，他就是把plan and execute模式落实得更具体了，强制Agent先做规范设计，再去实现代码，同时，它会让Agent把过去工作中我们的规范保留下来，在做后续更新时这些规范依然会生效。"
    },
    {
      "title": "科研随笔——量纲与符号回归",
      "date": "2026-03-18",
      "tags": [
        "符号回归",
        "量纲分析"
      ],
      "excerpt": "量纲分析，或者 Buckingham-PI 定理被经常拿来做符号回归算法的先验物理约束。量纲提供了一种极其廉价、却又确实有效的物理正则。它把变量从纯粹的数值列中拎出来，使模型至少知道哪些量可以相加，哪些量只能相乘，哪些组",
      "content": "# 1. 超越量纲本身的语义\n\n量纲分析，或者 Buckingham-PI 定理被经常拿来做符号回归算法的先验物理约束。量纲提供了一种极其廉价、却又确实有效的物理正则。它把变量从纯粹的数值列中拎出来，使模型至少知道哪些量可以相加，哪些量只能相乘，哪些组合在物理上没有意义。\n\n常见的量纲约束分为2种：\n\n- 1. 以本课题组发展的DHC-GEP、SITE框架为代表的量纲校核约束。这类方法常常先任意进行符号组合，随后将预先给定的符号量纲进行运算，给无法通过校核的表达式赋予大额的损失，强制淘汰。另一种类似的方式是，把量纲的匹配程度量化为一个罚函数，再通过一个可调超参数进行scaling，然后加到主损失函数上，这种做法不会百分百杜绝量纲不齐次的方程，但也因此不至于出现种群难以进化的现象（SITE的seed injection strategy就是用来解决直接赋予大损失带来的进化停滞问题）。\n- 2. 以Fukami的JFM（2024）、Bakarji的NCS（2022）、Xie的NC（2021）以及Xia的EAAI（2026）为代表的无量纲学习（dimensionless learning）方法。这类方法都是先用**量纲约束**把候选表达限制在“物理上允许”的空间里，再用数据去解决 Buckingham Π 定理“**可行但不唯一**”的问题，找出最能解释输出、最有泛化能力的低维无量纲表示。\n\n然而，量纲能提供的物理量的物理本质信息是很有限的，它刻画的是物理量可参与何种形式运算的边界，却没有触及这个物理量在理论结构中究竟扮演什么角色。同量纲变量之间的差别，正好暴露了这一层缺失。例如，速度、声速、扩散波速、相速度，量纲完全一致，数值尺度却可能相差多个数量级，更关键的是，它们进入方程的方式并不相同。某些量是系统状态，某些量是传输通量，某些量是材料参数，某些量则体现外部驱动或边界条件。只看量纲，这些差异全部被压缩了；只看数值，这些差异又被具体问题中的尺度、单位和采样方式淹没了。真正缺失的，似乎是**量纲之上、数值之下的那一层物理语义**。\n\n这层语义首先不是语言学意义上的名字，而是变量在物理结构中的位置。一个物理量是否守恒，是否可积，是否依赖参考系，是否具有方向性，是否描述局域状态还是跨边界交换，是否更接近原因还是结果，这些性质比变量名稳定得多，也比量纲更接近机制。换句话说，速度之所以不是声速，不在于它们叫法不同，也不在于单位不同，而在于它们分别对应不同的生成机制、不同的控制参数、不同的理论角色。前者通常是物体运动状态的一部分，后者更接近介质性质与热力学状态共同决定的传播特征。二者可以在同一组方程中相遇，但很少处于同一语义位置。\n\n因此，更合适的中间表示，未必是再造一个比量纲稍复杂一些的离散标签，而应当是一组描述变量物理角色的语义坐标。这个表示可以包含若干彼此独立的轴：它是状态量还是参数，是广延量还是强度量，是守恒变量还是本构变量，是局域定义还是非局域定义，是标量、矢量还是张量，是坐标变换下不变还是协变，是主要体现时间演化还是空间耦合。它们不像自然语言那样松散，也不像数值那样依赖具体样本分布，而是贴近理论建模时真正关心的结构信息。\n\n这件事还有一层更深的意义。量纲本质上是一种代数约束，它告诉我们表达式能否成立；语义角色则更接近结构约束，它告诉我们表达式为何会出现。代数约束能缩小搜索空间，结构约束则能改变搜索空间的形状。符号回归若只使用量纲，它依然在表达式层面搜索，只是少走一些死路；若进一步掌握变量的语义角色，它就有机会在机制层面组织搜索，把候选表达式限制在某类物理过程允许的范围内。这样一来，模型寻找的就不再只是形式上合法的组合，而是更可能对应真实生成机制的组合。从这个角度看，变量名本身也不应被简单丢弃。多数工作把变量名视为无信息标签，这在机器学习上很自然，因为字符串本身确实不携带稳定的数学结构。但在科学问题里，变量名往往是研究共同体长期压缩后的知识入口。压力、温度、密度、化学势，这些名称背后连着的是实验操作、理论传统、适用范围与典型近似。直接把名字输入模型当然过于粗糙，也容易引入语料偏见；可若把它们完全抹去，同样是在主动舍弃知识。更合理的做法，是不把名称当作最终表示，而把它当作检索语义属性的入口，再把这些较稳定、可形式化的属性编码为中间层。\n\n# 2. Beyond data-to-equation\n\n我们知道符号回归的目标是给定一组labeled的data（其实很多论文中都不做labeled，例如PSE和phyE2E，举例说就是输入数据的标签是无信息的，他只是$x_1$, $x_2$, ... 这样子，不关注这列数据向量背后的名字是啥，因为模型也不知道这个名字有什么意义，很多端到端的模型都是只看数据的语义信息），那么上一点中说的量纲其实很特殊，它仍属于标签信息，却已不再是纯粹的符号，而是物理语义压缩后的最简投影（仅用长度为7的向量，且该向量的值一般为小整数，用INT4即可表示）。问题在于，这种压缩也极其剧烈。量纲保留下来的是代数兼容性，折叠掉的却是变量在物理理论中的角色、生成机制和适用范围。\n\n我的直觉告诉我，真正的差异，可能真是在这部分被折叠的信息里。数值序列携带的信息量最大，却高度依赖尺度、单位、采样区间和具体任务；量纲最容易处理，却只给出最低限度的结构边界。两者之间显然还存在一层更有价值的中间表示。它不必像原始数据那样拥挤，也不能像量纲那样过于稀薄。对速度这一类同量纲变量而言，模型需要辨认的并不是单位是否一致，而是它究竟属于系统状态、传播特征、材料参数，还是某种外部驱动；它是否参与守恒关系，是否受参考系影响，是否主要决定时间演化，是否对应局域传输或全局约束。声速、光速和物体运动速度之所以不能互换，关键不在量纲，也不在数值大小，而在它们处于不同的物理角色。\n\n一旦这层表示能够稳定提取，从数据到方程之间那段过长的推断链条就会明显缩短。模型面对的将不再只是匿名数值列，而是一组带有物理角色和结构关系的变量。它先判断哪些量更像状态变量，哪些量更像本构参数，哪些组合可能形成不变量，哪些相互作用更接近守恒律、响应关系或尺度律；随后再在这些语义边界内搜索表达式。这样得到的方程，并非只是拟合误差更小，而是更接近科学问题本身的生成逻辑。\n\n早期的端到端 Transformer 模型则直接从样本点预测完整公式，试图跳过先定骨架、再拟合常数的两阶段流程；SymFormer 又把符号与常数一并生成，减少了后续优化与前向生成之间的割裂。这些工作证明，数据到公式的直接映射是可能的，也说明预训练模型确实能学到某种分布层面的公式先验；不过输入端依旧大多是匿名表格，变量在物理上的身份并未真正进入模型内部。\n\nPhyE2E 往前多走了一步。它先借助 oracle neural network 的二阶导数把问题拆成若干更易处理的子问题，再用 Transformer 做端到端公式翻译（这里还嵌入了量纲信息），并在末端接上 MCTS 与遗传编程做精修。这里最值得注意的，不是具体用了哪一套搜索器，而是它已经不满足于让模型从原始数值直接猜公式，而是先从数据中抽取局部结构信号，再把这些信号送入符号生成阶段。LLM 路线也呈现出类似趋势。LLM-SR 把方程视为程序，用预训练科学知识提出骨架假设，DrSR 更进一步，先分析数据中的单调性、非线性和相关结构，再让生成与反思形成闭环。到了 2026 年，PiT-PO 框架把物理约束与 token 级正则一并纳入策略优化，使搜索反馈真正进入模型参数更新；符号回归的重心也随之从更快生成公式，转向更早恢复决定公式形态的结构信息。\n\n因此，我认为量纲约束的下一步，并不是再设计一个比量纲稍复杂一些的标签系统，而是学习一种可计算的物理语义表征。它既能比量纲承载更多内容，又不至于像原始数值那样混杂。这样的表征至少应当包含三层信息：变量自身的角色，变量之间的关系，变量进入方程时可能服从的结构规则。前一层区分状态量、控制量、材料参数、响应量、守恒量、本构量；中间一层刻画依赖图、耦合强弱、可分离性、对称性、尺度关系和可能的不变量；最后一层限定候选算子族与组合方式，例如哪些量更可能通过梯度、散度、乘性耦合、指数律或幂律进入表达式。到这一步，模型做的就不再是无差别的式子拼接，而是在一个已经受到语义约束的空间里搜索。\n\nTLDR，符号回归未必要从数据直接走到方程。中间完全可以插入一个物理语义层，把数值、量纲、变量名、实验条件、坐标系信息、边界条件和已有知识库共同压缩成统一表示。端到端并不要求取消这一步；更成熟的端到端系统，很可能要把这一步学进模型内部。它先输出变量的语义角色和关系图，再在此基础上生成表达式。符号回归若要真正进入科学发现的核心地带，恐怕绕不过这一步。"
    },
    {
      "title": "论文阅读——SNIP (ICLR 2024)",
      "date": "2026-03-11",
      "tags": [
        "符号回归"
      ],
      "excerpt": "这篇论文中了 ICLR 2024 的 spotlight，4 个审稿人给出了 8 8 6 8 的高评价。其实，早在 2023 年 NeurIPS 的 AI4S track上，这篇论文就已经作为 poster 展示。这是一",
      "content": "[SNIP: Bridging Mathematical Symbolic and Numeric Realms with Unified Pre-training](https://openreview.net/forum?id=KZSEgJGPxu)\n\n## Intro\n\n这篇论文中了 ICLR 2024 的 spotlight，4 个审稿人给出了 **8 8 6 8** 的高评价。其实，早在 2023 年 NeurIPS 的 AI4S track上，这篇论文就已经作为 poster 展示。这是一篇典型的 AI 本位论文，将最时下最新的多模态思想和预训练概念完美应用到了符号学习上，本文的思路十分严谨，并非简单的套用AI模型。\n\n值得一提的是，本文一作 Kazem Meidani 老哥来自卡赖基梅隆大学（CMU），他同时也是 [LLM-SR](https://openreview.net/forum?id=m2nmp8P5in) 的作者，那篇论文之后我应该也会发布精读笔记。\n\n让我们言归正传，进入这篇论文的内容。\n\n## Motivation\n\nSNIP 框架可以分为两部分，即数值编码器和符号编码器。\n\n方法名 Symbolic-Numeric Integrated Pre-training (SNIP) 就比较有意思，和多模态领域的 Contrastive Language-Image Pre-training (CLIP \\[1]) 很相似，CLIP 是将图片与文本做对比学习，帮助模型获得图片和文字互相理解语义的能力，而SNIP把这样的对比学习对象从**图片-文字**换成了**方程（symbolic）-数据（numeric）**，预训练得到的一个能理解从数据到方程的潜空间映射（世界地图）。以后，针对任何其他具体任务，不需要做特定的监督训练，能直接端到端给出一个对映关系。\n\nSNIP 真正想回答的，不是“怎么把一个更强的模型塞进符号回归领域”，而是一个更前置、也更本质的问题：**同一个科学对象，本来就天然同时存在于两个世界里——一个是符号世界里的方程，一个是数值世界里的观测。我们过去的模型，大多只站在其中一边说话。** 现有工作要么从公式出发做数学推理（比如PINN，算子学习之类方法），要么从点集出发做符号回归（笔者老本行，往往就是给一组数据，用GA跑一个方程出来），而且通常都是围绕具体任务做监督训练；这样训练出来的模型，很容易学会某个任务的映射，却未必真的学会“这条曲线和这个公式为什么是一回事”。SNIP 的出发点，恰恰就是把这个缺口当作问题本身：先不急着做下游任务，先学会两种模态之间的对应关系。\n\n所以作者的方法提出得非常自然。既然图像和文本可以通过对比学习形成共同语义空间，那么**符号表达式**和**数值观测序列**也可以。这就是 SNIP 的第一层motivation。但作者没有停在一个漂亮比喻上，而是很认真地问了第二层问题：这两种模态到底该怎么编码，哪些结构该保留，哪些结构该刻意忽略。于是我们看到一个很克制的设计：数值端和符号端都用 Transformer 编码，但两边不是简单镜像，而是各自尊重本模态的结构约束。\n\n## Method\n\n具体来说，数值编码器处理的是一组 $((x,y))$ 点。作者沿用了此前 NeSymReS \\[2] 工作中的数值 tokenization，把浮点数转成 base-10 token；更重要的是，他们明确利用了**点集的置换不变性**，因此在 numeric encoder 中去掉了 positional embedding。\n\n这里我想聊聊什么是**置换不变性**。在 NLP 任务中，一句话被 tokenize 后显然不是置换不变的，比如”你爱我“和”我爱你“具有完全不同的语义，因此语言模型中的 transformer 往往引入位置编码（positional embedding）来考虑 tokens 在输入序列中相对位置的影响。而在符号回归任务中，我们通常是不去考虑数据点的空间（位置）特性的，举例说，对方程\n$$y = 4x^2, \\tag{1}$$\n我们给出的数据对 $(x,y)$ 很可能是局部采样，且不连续的，因此，我们训练一个 end-to-end 的模型时，不希望模型根据先给 $(1,4)$ 还是先给  $(0.5,1)$ 而改变输出的方程。这时候，以随意的顺序放入数据对可能就自然满足了置换不变的 bias。或者简单来想，不管 $x$ 取什么，只要 $y$ 服从方程给出的函数关系就行，方程形式不随输入的取值而产生改变。\n\n符号端则相反，表达式按照前缀树序列化，保留顺序信息，因此 symbolic encoder 继续使用 positional embedding。两个编码器最终都经过 attention pooling （普通 pooling 是“平均一下”或者“取最大值”，而 attention pooling 是“让模型自己决定，哪些 token 更重要，然后做加权平均”）压成固定长度向量，落到同一个 latent space。补充材料里还能看到，两边编码器都配成了 **8 层、16 头、512 维**；这引来了 reviewer 追问，作者也明确回应：它们的设置比 Kamienny（E2E-SR \\[3]）和 Biggio（NeSymReS \\[2]）等先前工作更深，是因为这里不只是做任务拟合，而是要学 *richer joint representations*。\n\n![The SNIP Framework](..\\images\\SNIP\\SNIP_overview.png)\n\n有了双编码器以后，SNIP 的核心就变得非常简单：对每个成对出现的“公式—数据”样本，做一个对称的 CLIP 式对比学习目标，让正确配对靠近、错误配对远离。该过程也是一个典型的无监督/自监督学习过程，此过程的代理任务为在batch内预测正确的 $(s_i,v_i)$ 配对关系，目标函数为一个对称的 InfoNCE 损失：\n\n$$\n\\mathcal L_{\\text{SNIP}}=\n\\frac{1}{2}\n\\left(\n\\mathcal L_{S\\rightarrow V}\n+\n\\mathcal L_{V\\rightarrow S}\n\\right).\n\\tag{2}\n$$\n\n其中 symbolic-to-numeric 的损失为：\n\n$$\\mathcal{L}_{S\\rightarrow V}=\n-\\frac{1}{|\\mathcal B|}\n\\sum_{(s,v)\\in\\mathcal B}\n\\log\n\\frac{\n\\sum_{v^+\\in V^+(s)}\n\\exp\\!\\left(\\frac{z_s^\\top z_{v^+}}{\\tau}\\right)\n}{\n\\sum_{v'\\in V(\\mathcal B)}\n\\exp\\!\\left(\\frac{z_s^\\top z_{v'}}{\\tau}\\right)\n}.\n\\tag{3}$$\n\n对应地，$\\mathcal{L}_{V\\rightarrow S}$ 完全对称，只是把 symbolic 和 numeric 的角色互换。\n\n从机制上看，这个损失一方面是**拉近正配对**：对应同一个函数的符号式和数值点集，它们的 embedding 相似度要变大。另一方面是**推远错配对**：  同一个 batch 里其他不对应的 $v_j$​ 或 $s_j$​ 都被当作负样本，让模型学会区分“这是同一个数学对象的两种表示”与“这不是”。\n\n值得注意的是，作者指出了如何生成用于训练的**合成数据**：样本由随机函数生成，再采样数据点、清理超出定义域或数值爆炸的样本，并在预训练阶段把 $(y)$ 归一化到 $(0,1)$，强调函数行为而非数值尺度。最终，模型在训练中见到了大约 6000 万个合成的 symbolic-numeric pair。\n\n## Symbolic regression\n\n接下来是把训练好的潜空间判别器拿来应用到下游的符号回归任务上。\n\n![Using SNIP for Symbolic Regression](..\\images\\SNIP\\SNIP_for_SR.png)\n\n论文把预训练好的潜空间“判别器”真正接到符号回归上时，并不是直接让 SNIP 从数值点集端到端吐出公式，而是把 **预训练的 numeric encoder** 先当成一个更好的表征前端：输入一组数值观测 $v$，先得到其潜表示 $z_v$ 。但下游解码器仍沿用已有的 E2E symbolic regression 框架，因此作者额外训练了一个 **mapping network** （上图a中的红色部分），把 $z_v$ ​ 映射成 decoder 可以接收的 token-like latent sequence，再交给已经预训练好的 expression decoder 生成公式。也就是说，SNIP 在这里不直接取代原有 SR 系统，而是先把“数据长什么样”编码得更好，再把这个表征喂给已有的公式生成器。这一段设计借鉴了 ClipCap \\[5]：结合预训练好的图片编码器和 GPT-2 的专业编码器，保留强大的生成端，只替换和重塑前端表示。\n\n但作者并没有止步于此。他们更进一步意识到，如果 SNIP 学到的 latent space 真有语义结构，那么它不应该只被拿来喂 decoder 一次，而应该成为搜索空间本身。顺其自然的，作者提出了 **Latent Space Optimization (LSO)**。做法是：先围绕输入样本的潜表示初始化一批 latent population，再在连续潜空间里用梯度自由优化器不断更新这些 latent code；每一步都把候选 latent 解码成表达式，去重 skeleton、再对常数做数值优化，最后按拟合分数筛选最优公式。这样一来，符号回归就不再只是在离散公式树空间里硬搜，而是先在一个已经被 symbolic-numeric 对比学习塑形过的“语义潜空间”里找更有希望的区域，再把它译回显式公式。\n\n很多 AI 研究者做 SR 时的直觉，是直接从 numeric input 到 symbolic output 搞一个 end-to-end seq2seq，SNIP 没有完全否定这条路，而是踩在了前人的肩膀上。这点实在是巧妙，SNIP 擅长的是“把数据编码好”，而不是“一步到位把表达式吐出来”。这种模块化复用，反而让整个方法更可信。**这里也是笔者感悟很深的地方，很多时候做一个新方法并不是每个 component 都应该 design/build from scratch，往往 A+B+X 会比 X1+X2+X3 效果好，踩得坑也会少很多。**\n\n## Experiments and results\n\n实验上，作者没有只和一个 transformer baseline 比，而是直接放到经典的 **SRBench** \\[6] 体系里，与 E2E 以及经典 GP 类方法一起看 accuracy-complexity trade-off。他们评估了 119 个 Feynman、14 个 Strogatz、以及 57 个 black-box 数据集，并且由于复用了 E2E decoder，整个设置限制在连续特征、维度 ($D \\le 10$) 的范围内。\n\n结果很有说服力：SNIP 在三类数据集上都落在第一 Pareto front；在 Strogatz 上达到 **0.928** 的 top-tier accuracy；在 black-box 上以更低复杂度 **47.52** 超过 Operon 的 **64.95**；在 Feynman 上又同时展示出比 Operon 更低的复杂度、比 AIFeynman 更高的精度。\n\n此外，作者在补充材料里做了严谨的消融实验：没有 LSO 时，($R^2>0.99$) 的平均成功率只有 **0.683**；加上 LSO 后，能稳定提升到 **0.80+**，这与 LSO 过程中使用梯度/无梯度优化器关系不大。可见 LSO 对提升准确率的巨大作用。\n\n## My thinking\n\n这篇论文对符号回归乃至所有 AI4S 领域的研究者都很有启发。\n\n1. **不要把下游任务当作唯一入口**。作者不是盯着 SR 本身开始研究，而是先问：SR 为什么难？难在 numeric realm 和 symbolic realm 之间没有一个共享语义层。这个问题一旦被提对了，后面的架构、预训练和优化几乎都是顺理成章的。很多时候，提升不是来自更大的模型，而是来自把任务往上抽象一层。\n2. **实验设计要能证明你方法的“中间假设”**。论文不止 SNIP 给出了 SRBench 的基准表现，还插入了 cross-modal property prediction 和 latent space visualization，专门验证模型是否真的学到了共同语义。这类实验特别值得学习，因为很多论文的方法故事听起来都很顺，但缺的恰恰是对中间机制的验证。如何向读者证明我们好的根本原因，其中有很深的学问。\n3. **不要迷信纯 end-to-end**。SNIP 把 representation learning、sequence generation、continuous optimization 三者拆开，又通过映射层和 latent search 把它们重新链接。这种“分而治之，再重新耦合”的思想，对科学发现类问题尤其重要，因为这类问题往往既有结构先验、又有搜索难度、还要求可解释。\n4. **AI4S 里，预训练到底应该预训练什么。** SNIP 给出的答案是——不是预训练某个任务，而是预训练不同科学表述之间的对齐关系。可以看到，本文几乎没有做物理语义空间上的对齐，这是否是一个可行的方向？笔者未来应该也会尝试。\n\n当然，本文中也讨论了 SNIP 的局限性：SNIP 仍然依赖闭式函数的数据生成协议，输入维度被限制在 ($D \\le 10$)，operator vocabulary 也受预定义语法约束；对那些本身就不适合被紧凑公式描述的模式，它并不总会 work。\n\n## Reference\n\n\\[1] Alec Radford, Jong Wook Kim, Chris Hallacy, Aditya Ramesh, Gabriel Goh, Sandhini Agarwal, Girish Sastry, Amanda Askell, Pamela Mishkin, Jack Clark, Gretchen Krueger, and Ilya Sutskever. Learning transferable visual models from natural language supervision. In Marina Meila and Tong Zhang (eds.), Proceedings of the 38th International Conference on Machine Learning, volume 139 of Proceedings of Machine Learning Research, pp. 8748–8763. PMLR, 18–24 Jul 2021.\n\n\\[2] Luca Biggio, Tommaso Bendinelli, Alexander Neitz, Aurelien Lucchi, and Giambattista Parascandolo. Neural symbolic regression that scales. In Marina Meila and Tong Zhang (eds.), Proceedings of the 38th International Conference on Machine Learning, volume 139 of Proceedings of Machine Learning Research, pp. 936–945. PMLR, 18–24 Jul 2021.\n\n\\[3] Pierre-Alexandre Kamienny, Stephane d’Ascoli, Guillaume Lample, and Francois Charton. End-to-end symbolic regression with transformers. In Advances in Neural Information Processing Systems, 2022.\n\n\\[4] [对比学习（Contrastive Learning），必知必会](https://mp.weixin.qq.com/s/sUAoNXGvwWa6lecq73pyAg)\n\n\\[5] Ron Mokady, Amir Hertz, and Amit H Bermano. Clipcap: Clip prefix for image captioning. arXiv preprint arXiv:2111.09734, 2021.\n\n\\[6] William La Cava, Patryk Orzechowski, Bogdan Burlacu, Fabricio de Franca, Marco Virgolin, Ying Jin, Michael Kommenda, and Jason Moore. Contemporary symbolic regression methods and their relative performance. In J. Vanschoren and S. Yeung (eds.), Proceedings of the Neural Information Processing Systems Track on Datasets and Benchmarks, volume 1, 2021."
    }
  ],
  "vinyl": [
    {
      "title_en": "I Love You",
      "artist": "陶喆 David Tao",
      "album": "David Tao (1997)",
      "note_en": "A love song so simple it disarms you.",
      "preview": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/41/71/fc/4171fc82-29c0-628c-1210-5aa772c24dd4/mzaf_15001781148470870809.plus.aac.p.m4a",
      "cover": "assets/covers/taotzu.png"
    },
    {
      "title_en": "Somebody to Love",
      "artist": "Queen",
      "album": "A Day at the Races (1976)",
      "note_en": "Gospel-rock at its peak — Freddie turns loneliness into a hymn.",
      "preview": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a5/4b/64/a54b641c-7546-c695-1763-ce61458d6260/mzaf_15035944246675270326.plus.aac.p.m4a",
      "cover": "assets/covers/queen.png"
    },
    {
      "title_en": "cardigan",
      "artist": "Taylor Swift",
      "album": "folklore (2020)",
      "note_en": "A song like an old cardigan — worn, pilled, irreplaceable.",
      "preview": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/6a/cd/00/6acd00e6-a733-7a98-07eb-0a889b2b35ab/mzaf_424591521405406197.plus.aac.p.m4a",
      "cover": "assets/covers/taylor.png"
    },
    {
      "title_en": "Wet Hands",
      "artist": "C418",
      "album": "Minecraft – Volume Alpha (2011)",
      "note_en": "Rain on a blocky world at 2 a.m. — lonely, but gentle.",
      "preview": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/33/be/0e/33be0e48-0e6e-f557-d915-d02014405b83/mzaf_17677877149121491792.plus.aac.p.m4a",
      "cover": "assets/covers/c418.png"
    }
  ]
};
