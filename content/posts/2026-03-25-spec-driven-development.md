---
title: "善用SDD助力AI coding"
tags: ["Agent","SDD"]
excerpt: "AI coding时下十分火爆，大家纷纷尝试claude code、codex、open code等AI编程工具加速开发，但使用这些工具时，抛开飞速跳跃的消耗token数不谈，一个很让人难受的点是AI工具一顿猛写，结果发"
---
# 1. 什么是SDD？

AI coding时下十分火爆，大家纷纷尝试claude code、codex、open code等AI编程工具加速开发，但使用这些工具时，抛开飞速跳跃的消耗token数不谈，一个很让人难受的点是AI工具一顿猛写，结果发现先出来的代码与自己的想法总是有偏差。而且，我们大部分科研人一般不会让AI从0开发，常见的需求一般是让AI结合已有框架或仓库做增量开发或功能修改，这时候AI工具被限制在了框框里（如果给AI从0开发的空间，有时候它甚至会表现得更好），往往会写出与原始代码风格完全不同的东西，很多功能倾向于另起炉灶，而这是我们不愿意看到的。

那么，有没有什么方法让AI能像一个可靠的合作者一样，基于一套规范的开发流程，按照用户的要求在限制内做好二次开发呢？这里我们要引入一个叫做**SDD**（**Spec-Driven Development**）的方法论，也就是“规范驱动开发”。SDD的核心理念是先编写‌**结构化、可执行的规范**‌（Spec），再由AI生成代码，确保质量与可维护性。

这里我记录一个帮助我们进行SDD的开源仓库[OpenSpec](https://github.com/Fission-AI/OpenSpec)，并使用codex做演示，介绍OpenSpec的常见功能。

# 2. OpenSpec

OpenSpec是一个轻量化的工具，可以辅助我们的coding agent生成规范的代码。每次提出新的需求前，它会先让agent按照一个工作流生成标准文档，用户审核这些文档后，再开始具体的代码编写工作。
## 2.1 安装和初始化

首先在全局安装OpenSpec：

```bash
npm install -g @fission-ai/openspec@latest
```

可以用以下命令验证安装是否成功：

```bash
openspec --version
```

然后进入工作目录，进行项目规范初始化：

```bash
cd your-project
openspec init
```

初始化成功如图所示，图中也展示了我们常用的几个命令：

![初始化](assets/post-images/Agent/openspec.png)

按enter选择工具，这里我们选择Codex，当然你也可以选择Claude Code或其他coding agent。

初始化后，OpenSpec会在当前工作区根目录下创建一个文件夹`openspec`，其中会有两个子文件夹，分别是`spec`（放我们项目的规范）和`changes`(放每个正在进行的变更)。

## 2.2 斜杠命令

初始化好之后，我们就可以正常的在coding agent中使用斜杠命令来与OpenSpec进行交互了。

正常使用命令唤起coding agent，这里我们使用`codex`唤起Codex，接下来就是使用以下命令告诉AI我们想实现的是什么了：

```
/opsx:propose <what-you-want-to-build>
```

这个命令会强制让agent进行思考，生成`design.md`, `proposal.md`, `task.md`这三个文件，分别是技术设计、提案和任务清单，此时我们要做的就是Review这些文档，有问题的地方直接修改，当然，我们也可以用自然语言告诉agent我们需要改什么，让他来修改这些文档。

确定没问题后，运行：

```
/opsx:apply
```

Agent会按照`task.md`的指示去实习提案。

# 3. 总结

其实OpenSpec做的事非常简单，他就是把plan and execute模式落实得更具体了，强制Agent先做规范设计，再去实现代码，同时，它会让Agent把过去工作中我们的规范保留下来，在做后续更新时这些规范依然会生效。
