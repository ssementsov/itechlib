export class Vote {
    constructor(
        id = 0,
        voteObjectId = null,
        voteObjectType = {},
        voteType = {}
    ) {
        this.id = id;
        this.voteObjectId = voteObjectId;
        this.voteObjectType = voteObjectType;
        this.voteType = voteType;
    }
}
