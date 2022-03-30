import { useState } from 'react';
import { Vote } from '../models/vote-model';
import { voteObjectTypes, voteType } from '../common/constants/vote-constants';
import { VoteAPI } from '../api/vote-api';

export const useVoting = () => {
    const [isVoted, setIsVoted] = useState(false);

    const negativeVoteHandler = (e, bookId) => {
        e.stopPropagation();
        const vote = new Vote(
            0,
            bookId,
            voteObjectTypes.suggestedBook,
            voteType.negative
        );
        VoteAPI.voteSuggestedBook(vote)
            .then(() => {
                setIsVoted(true);
                console.log('vote');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const positiveVoteHandler = (e, bookId) => {
        e.stopPropagation();
        const vote = new Vote(
            0,
            bookId,
            voteObjectTypes.suggestedBook,
            voteType.positive
        );
        VoteAPI.voteSuggestedBook(vote)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return {
        onNegativeVote: negativeVoteHandler,
        onPositiveVote: positiveVoteHandler,
        isVoted: isVoted,
        setIsVoted: setIsVoted,
    };
};
