import { useChatHandler } from "@/components/chat/chat-hooks/use-chat-handler"
import { ChatbotUIContext } from "@/context/context"
import { Tables } from "@/supabase/types"
import { FC, useContext, useState } from "react"
import { Message } from "../messages/message"
import { ChatMessage } from "@/types"

interface ChatMessagesProps {}

export const ChatMessages: FC<ChatMessagesProps> = ({}) => {
  const { chatMessages, chatFileItems } = useContext(ChatbotUIContext)

  const { handleSendEdit } = useChatHandler()

  const [editingMessage, setEditingMessage] = useState<Tables<"messages">>()

  console.log("chatMessages", JSON.stringify(chatMessages, null, 2))

  const MockMessageJson = [
    {
      message: {
        id: "9f510699-5634-4751-b72b-3405f240b1c5",
        chat_id: "a09ae80f-0334-4670-b507-cb68ceba1ddb",
        user_id: "0ad9a610-e401-4d7f-a90e-87c48579887d",
        created_at: "2024-04-09T09:27:49.021086+00:00",
        updated_at: "2024-04-09T09:27:49.045953+00:00",
        content: "Do sample docking",
        image_paths: [],
        model: "gpt-4-turbo-preview",
        role: "user",
        sequence_number: 0,
        assistant_id: null
      },
      fileItems: []
    },
    {
      message: {
        id: "696e9042-937e-432f-ab2e-7fd26861ed9b",
        chat_id: "a09ae80f-0334-4670-b507-cb68ceba1ddb",
        user_id: "0ad9a610-e401-4d7f-a90e-87c48579887d",
        created_at: "2024-04-09T09:27:49.021086+00:00",
        updated_at: null,
        content:
          '### Config job uni-dock-21deefafdsafaf-dsf     \n<iframe src="https://toolbox.dp.tech/widgets/job/uni-dock-f763fd2c63ab438c9dc8cff0ba3831a2" width="600" height="400"></iframe>',
        image_paths: [],
        model: "gpt-4-turbo-preview",
        role: "assistant",
        sequence_number: 1,
        assistant_id: null
      },
      fileItems: []
    },
    {
      message: {
        id: "cccd9372-6926-4cd3-b7db-31c382ccdeed",
        chat_id: "a09ae80f-0334-4670-b507-cb68ceba1ddb",
        user_id: "0ad9a610-e401-4d7f-a90e-87c48579887d",
        created_at: "2024-04-09T09:30:09.314886+00:00",
        updated_at: "2024-04-09T09:30:09.348087+00:00",
        content: "提交",
        image_paths: [],
        model: "gpt-4-turbo-preview",
        role: "user",
        sequence_number: 2,
        assistant_id: null
      },
      fileItems: []
    },
    {
      message: {
        id: "4fe6a047-bc19-4a4b-8b3a-a5d27ffa13ee",
        chat_id: "a09ae80f-0334-4670-b507-cb68ceba1ddb",
        user_id: "0ad9a610-e401-4d7f-a90e-87c48579887d",
        created_at: "2024-04-09T09:30:09.314886+00:00",
        updated_at: null,
        content:
          '### Confirm to submit uni-dock-21deefafdsafaf-dsf     \n<iframe src="https://toolbox.dp.tech/widgets/job/uni-dock-f763fd2c63ab438c9dc8cff0ba3831a2" width="600" height="400"></iframe>',
        image_paths: [],
        model: "gpt-4-turbo-preview",
        role: "assistant",
        sequence_number: 3,
        assistant_id: null
      },
      fileItems: []
    }
  ]

  // convert MockMessageJson to chatMessages of ChatMessage list
  const mockMessages: ChatMessage[] = MockMessageJson.map(item => {
    return {
      message: item.message,
      fileItems: item.fileItems
    }
  })

  return mockMessages
    .sort((a, b) => a.message.sequence_number - b.message.sequence_number)
    .map((chatMessage, index, array) => {
      const messageFileItems = chatFileItems.filter(
        (chatFileItem, _, self) =>
          chatMessage.fileItems.includes(chatFileItem.id) &&
          self.findIndex(item => item.id === chatFileItem.id) === _
      )

      return (
        <Message
          key={chatMessage.message.sequence_number}
          message={chatMessage.message}
          fileItems={messageFileItems}
          isEditing={editingMessage?.id === chatMessage.message.id}
          isLast={index === array.length - 1}
          onStartEdit={setEditingMessage}
          onCancelEdit={() => setEditingMessage(undefined)}
          onSubmitEdit={handleSendEdit}
        />
      )
    })
}
