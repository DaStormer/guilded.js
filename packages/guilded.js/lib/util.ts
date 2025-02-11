import { Embed } from "@guildedjs/embeds";
import type { RESTPostChannelMessagesBody } from "@guildedjs/guilded-api-typings";
import { ROUTES } from "./constants";

export enum IMG_EXTENSION {
    PNG = "png",
    GIF = "gif",
    WEBP = "webp",
}

export type IMG_SIZE = "Small" | "Medium" | "Large";

const formAssetURL = (route: string, hash: string, extension: string, width?: number, height?: number, size?: string): string => {
    const url = new URL(`https://${ROUTES.IMAGE_CDN_DOMAIN}/${route}/${hash}-${size}.${extension.toLowerCase()}`);
    if (width) url.searchParams.append("w", width.toString());
    if (height) url.searchParams.append("h", height.toString());
    return url.toString();
};

export const ASSET_BUILDER = {
    AVATAR_URL: (hash: string, size: IMG_SIZE = "Medium"): string => formAssetURL("UserAvatar", hash, IMG_EXTENSION.PNG, undefined, undefined, size),
    IMAGE_IN_CHAT: (hash: string, size = "Full", width?: number, height?: number): string =>
        formAssetURL("ContentMedia", hash, IMG_EXTENSION.WEBP, width, height, size),
    PROFILE_BANNER: (hash: string, size = "Hero", width?: number, height?: number): string =>
        formAssetURL("UserBanner", hash, IMG_EXTENSION.PNG, width, height, size),
    TEAM_BANNER: (hash: string, size = "Hero", width?: number, height?: number): string =>
        formAssetURL("TeamBanner", hash, IMG_EXTENSION.PNG, width, height, size),
    TEAM_EMOJI: (hash: string, size = "Full", extension: "WEBP" | "APNG" = "WEBP", width?: number, height?: number): string =>
        formAssetURL("CustomReaction", hash, extension.toLowerCase(), width, height, size),
    TEAM_ICON: (hash: string, size: "Small" | "Medium" | "Large" = "Medium"): string =>
        formAssetURL("TeamAvatar", hash, IMG_EXTENSION.PNG, undefined, undefined, size),
};

export const buildMemberKey = (serverId: string, memberId: string): string => {
    return `${serverId}:${memberId}`;
};

export const resolveContentToData = (content: RESTPostChannelMessagesBody | string | Embed) =>
    typeof content === "string" ? { content } : content instanceof Embed ? { embeds: [content.toJSON()] } : content;
