/* istanbul ignore file */

export class GuildedAPIError extends Error {
    public constructor(
        msg: string,
        public readonly method: string,
        public readonly path: string,
        public readonly statusCode: number | string,
        public readonly body: Record<string, any>,
    ) {
        super(`[GuildedAPIError:${statusCode}:${method.toUpperCase()}] ${path} - ${msg}`);
    }
}
