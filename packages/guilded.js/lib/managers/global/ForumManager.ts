import type { ForumThreadPayload, RESTPostForumThreadBody } from "@guildedjs/guilded-api-typings";
import { GlobalManager } from "./GlobalManager";

export class GlobalForumManager extends GlobalManager {
    /** Create a thread in a forum */
    createThread(channelId: string, options: RESTPostForumThreadBody): Promise<ForumThreadPayload> {
        return this.client.rest.router.createForumThread(channelId, options).then((data) => data.forumThread);
    }
}
