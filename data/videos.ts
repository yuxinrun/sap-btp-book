/**
 * 视频与课程资源
 * 重要：本站不虚构任何 YouTube 视频 ID。以下条目均为可核实的 SAP 官方站点/频道入口，
 * embedId 为 null 表示「不在站内嵌入」，点击后跳转官方原始页面观看。
 * 站内仍提供 <YouTubeEmbed> 组件与「粘贴官方视频链接嵌入」工具，供已核实 ID 的场景使用。
 */
export interface VideoResource {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  provider: string;
  sourceUrl: string;
  embedId: string | null;
  topic: string;
  duration: string;
}

export const videoResources: VideoResource[] = [
  {
    id: 'v-sap-tech-channel',
    title: 'SAP Technology 官方 YouTube 频道',
    description: 'SAP 官方技术频道，包含 BTP、集成、开发与平台能力的产品演示与技术讲解。频道内视频按主题与播放列表组织，请以频道当前内容为准。',
    objectives: ['了解 SAP 官方技术内容的组织方式', '按主题查找 BTP 相关的官方演示', '识别视频对应的产品版本'],
    provider: 'SAP 官方 YouTube',
    sourceUrl: 'https://www.youtube.com/@SAPTechnology',
    embedId: null,
    topic: '综合',
    duration: '频道',
  },
  {
    id: 'v-developers-tutorials',
    title: 'SAP Developers 官方教程（含视频演示）',
    description: 'SAP Developers 官方分步教程库，部分教程内嵌官方演示视频与动手练习，可按 BTP、CAP、SAPUI5、Integration Suite 等主题筛选。',
    objectives: ['按主题检索官方动手教程', '跟随教程完成可验证的练习', '对照教程版本检查当前租户差异'],
    provider: 'SAP Developers',
    sourceUrl: 'https://developers.sap.com/tutorials/',
    embedId: null,
    topic: '入门实战',
    duration: '课程库',
  },
  {
    id: 'v-learning',
    title: 'SAP Learning 官方学习课程',
    description: 'SAP 官方学习平台，提供面向 BTP 与相关产品的结构化课程与学习路径，包含视频、练习与知识测评。',
    objectives: ['建立系统化学习路径', '完成课程内练习与测评', '为认证考试做准备'],
    provider: 'SAP Learning',
    sourceUrl: 'https://learning.sap.com/',
    embedId: null,
    topic: '系统课程',
    duration: '课程',
  },
  {
    id: 'v-community-webinars',
    title: 'SAP Community 技术内容',
    description: 'SAP 官方社区中的技术博客、问答与线上活动回放，适合查找具体报错与实施经验，需注意内容时效性。',
    objectives: ['检索具体错误的处理经验', '关注平台版本变更', '参与官方社区讨论'],
    provider: 'SAP Community',
    sourceUrl: 'https://community.sap.com/',
    embedId: null,
    topic: '问题排查',
    duration: '社区',
  },
  {
    id: 'v-cap-docs',
    title: 'CAP 官方文档与示例演示',
    description: 'SAP CAP 官方文档站点中的入门示例与部署指南，配合 SAP Samples 仓库可复现完整项目。',
    objectives: ['理解 CDS 建模到服务暴露的流程', '复现官方最小 CAP 项目', '掌握本地与云端部署差异'],
    provider: 'SAP CAP / SAP Samples',
    sourceUrl: 'https://cap.cloud.sap/docs/',
    embedId: null,
    topic: 'CAP 开发',
    duration: '文档 + 示例',
  },
  {
    id: 'v-samples',
    title: 'SAP Samples 官方示例仓库',
    description: '包含 XSUAA、App Router、MTA、CAP、Fiori 等主题的可运行示例代码，建议配合本站实战项目一起阅读。',
    objectives: ['阅读官方示例目录结构', '对照 xs-security.json 与 mta.yaml 写法', '在本地复现示例代码'],
    provider: 'SAP Samples（GitHub）',
    sourceUrl: 'https://github.com/SAP-samples',
    embedId: null,
    topic: '示例代码',
    duration: '代码库',
  },
  {
    id: 'v-discovery',
    title: 'SAP Discovery Center 服务与任务说明',
    description: '官方服务目录与实施任务（Mission）说明，可用于核对服务计划、区域可用性与计价模型。',
    objectives: ['核对服务计划与区域可用性', '理解服务计量方式', '在实施前评估成本'],
    provider: 'SAP Discovery Center',
    sourceUrl: 'https://discovery-center.cloud.sap/',
    embedId: null,
    topic: '服务规划',
    duration: '官方目录',
  },
  {
    id: 'v-help-btp',
    title: 'SAP Help Portal：BTP 官方文档',
    description: '所有重要技术结论的最终核对来源；文档按产品与版本组织，本书每篇教程末尾都会给出应检索的关键词。',
    objectives: ['按关键词定位官方文档', '核对版本与适用环境', '验证配置参数是否存在'],
    provider: 'SAP Help Portal',
    sourceUrl: 'https://help.sap.com/docs/btp',
    embedId: null,
    topic: '官方文档',
    duration: '文档库',
  },
];
