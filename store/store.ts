import { defineStore } from "pinia"
import {preloadedMessageList, PreloadedMessagesListInterface, studentName} from "@/data/data";
import { getAttachmentExtension } from "@/mixins/mixins";

export const useConversationStore = defineStore("conversation", {
    state: () => ({
        messagesList: preloadedMessageList as PreloadedMessagesListInterface[],
        workVersion: 2,
    }),
    actions: {
        sendAttachmentMessage(attachment: object): void {
            const newData: PreloadedMessagesListInterface = {
                author: studentName,
                attachment: {
                    name: attachment.name,
                    extension: getAttachmentExtension(attachment.name),
                    size: attachment.size,
                    url: URL.createObjectURL(attachment as Blob), // Create URL to download the correct file
                    version: ++this.workVersion,
                },
                date: new Date(),
                isStudent: true,
                body: "",
            };

            this.messagesList.push(newData);
        },
        sendTextMessage(text: string): void {
            const newData: PreloadedMessagesListInterface = {
                author: studentName,
                attachment: {},
                date: new Date(),
                isStudent: true,
                body: text,
            };

            this.messagesList.push(newData);
        },
    },
})