import { Vote } from '../models/vote-model';
import { voteObjectTypes, voteType } from '../common/constants/vote-constants';
import { VoteAPI } from '../api/vote-api';

export const useVoting = (books, setBooks, book, setBook) => {
    const negativeVoteHandler = (e, bookId) => {
        e.stopPropagation();
        const vote = new Vote(0, bookId, voteObjectTypes.suggestedBook, voteType.negative);
        VoteAPI.voteSuggestedBook(vote)
            .then(() => {
                setBooks(
                    books.map((book) =>
                        book.id === bookId
                            ? { ...book, amountVote: { negative: 1, positive: 0 } }
                            : book
                    )
                );
                setBook({ ...book, amountVote: { negative: 1, positive: 0 } });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const positiveVoteHandler = (e, bookId) => {
        e.stopPropagation();
        const vote = new Vote(0, bookId, voteObjectTypes.suggestedBook, voteType.positive);
        VoteAPI.voteSuggestedBook(vote)
            .then(() => {
                setBooks(
                    books.map((book) =>
                        book.id === bookId
                            ? { ...book, amountVote: { negative: 0, positive: 1 } }
                            : book
                    )
                );
                setBook({ ...book, amountVote: { negative: 0, positive: 1 } });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return {
        onNegativeVote: negativeVoteHandler,
        onPositiveVote: positiveVoteHandler,
    };
};
