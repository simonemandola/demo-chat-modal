import { defineStore } from "pinia"
import { preloadedMessageList, MessageInterface } from "@/data/data";
import { getAttachmentExtension } from "@/mixins/mixins";

export const useConversationStore = defineStore("conversation", {
    state: () => ({
        messagesList: preloadedMessageList as MessageInterface[],
        workVersion: 2,
    }),
    actions: {
        sendMessage(data: object | string): void {

            let newMessage: MessageInterface;

            if (typeof data === "string") {
                // Create new data to push into the messages list
                newMessage = {
                    attachment: {},
                    date: new Date(),
                    isStudent: true,
                    body: data,
                };

            } else {
                // Create new data to push into the messages list
                newMessage = {
                    attachment: {
                        name: data.name,
                        extension: getAttachmentExtension(data.name),
                        size: data.size,
                        url: URL.createObjectURL(data as Blob), // Create URL to download the correct file
                        version: ++this.workVersion,
                    },
                    date: new Date(),
                    isStudent: true,
                    body: "",
                };
            }

            // Add new message to list
            this.messagesList.push(newMessage);

        },
    },
})