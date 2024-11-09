// Enum for Node Types
export enum FlowNodeType {
  Trigger = 'trigger',
  SendMessage = 'sendMessage',
  DateTime = 'dateTime',
  DateTimeConnector = 'dateTimeConnector',
  AddComment = 'addComment',
}

// Base Interface for Nodes
export interface FlowNodeBase {
  id: string
  parentId: string | null
  name?: string
  type: FlowNodeType
  position: { x: number; y: number } // For vue-flow positioning
  data?: FlowNodeData
}

// Node Data Types
export type FlowNodeData =
  | TriggerNodeData
  | SendMessageNodeData
  | DateTimeNodeData
  | DateTimeConnectorNodeData
  | AddCommentNodeData

// Specific Node Data Interfaces
export interface TriggerNodeData {
  eventType: 'conversationOpened' | 'messageReceived' | 'customEvent'
  oncePerContact: boolean
}

export interface SendMessageNodeData {
  payload: MessagePayload[]
}

export interface MessagePayload {
  type: 'text' | 'attachment'
  content: string // Text content or attachment URL
}

export interface DateTimeNodeData {
  times: BusinessHour[]
  connectors: {
    success: string // Node ID for success path
    failure: string // Node ID for failure path
  }
  timezone: string
  action: 'businessHours'
}

export interface BusinessHour {
  startTime: string // "HH:mm"
  endTime: string // "HH:mm"
  day: DayOfWeek
}

export type DayOfWeek = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'

export interface DateTimeConnectorNodeData {
  connectorType: 'success' | 'failure'
}

export interface AddCommentNodeData {
  comment: string
}

// Specific Node Interfaces
export interface TriggerNode extends FlowNodeBase {
  type: FlowNodeType.Trigger
  data: TriggerNodeData
}

export interface SendMessageNode extends FlowNodeBase {
  type: FlowNodeType.SendMessage
  data: SendMessageNodeData
}

export interface DateTimeNode extends FlowNodeBase {
  type: FlowNodeType.DateTime
  data: DateTimeNodeData
}

export interface DateTimeConnectorNode extends FlowNodeBase {
  type: FlowNodeType.DateTimeConnector
  data: DateTimeConnectorNodeData
}

export interface AddCommentNode extends FlowNodeBase {
  type: FlowNodeType.AddComment
  data: AddCommentNodeData
}

// Union Type for All Nodes
export type FlowNode =
  | TriggerNode
  | SendMessageNode
  | DateTimeNode
  | DateTimeConnectorNode
  | AddCommentNode

// Root Flow Type
export type Flow = FlowNode[]
