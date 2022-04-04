import { Vote } from '../models/vote-model';
import {
    voteObjectTypes,
    voteType,
    isAlreadyVotedMessage,
} from '../common/constants/vote-constants';
import { VoteAPI } from '../api/vote-api';
import { useCustomSnackbar } from './custom-snackbar-hook';

export const useVoting = (books, setBooks, book, setBook) => {
    const { enqueueSnackbar, defaultErrorSnackbar } = useCustomSnackbar();

    const negativeVoteHandler = (e, bookId) => {
        e.stopPropagation();
        const vote = new Vote(0, bookId, voteObjectTypes.suggestedBook, voteType.negative);
        VoteAPI.voteSuggestedBook(vote)
            .then(() => {
                setBooks(
                    books.map((book) => {
                        return book.id === bookId
                            ? {
                                  ...book,
                                  amountVote: {
                                      negative: book.amountVote ? book.amountVote.negative + 1 : 1,
                                      positive: book.amountVote?.positive || 0,
                                      currentUserVote:
                                          book.amountVote?.currentUserVote ||
                                          voteType.negative.name,
                                  },
                              }
                            : book;
                    })
                );
                setBook({
                    ...book,
                    amountVote: {
                        negative: book.amountVote ? book.amountVote.negative + 1 : 1,
                        positive: book.amountVote?.positive || 0,
                        currentUserVote: book.amountVote?.currentUserVote || voteType.negative.name,
                    },
                });
            })
            .catch((err) => {
                if (err.response.data.message === isAlreadyVotedMessage) {
                    enqueueSnackbar('You have already voted this book!', {
                        variant: 'warning',
                    });
                } else {
                    defaultErrorSnackbar();
                }
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
                            ? {
                                  ...book,
                                  amountVote: {
                                      negative: book.amountVote?.negative || 0,
                                      positive: book.amountVote ? book.amountVote.positive + 1 : 1,
                                      currentUserVote:
                                          book.amountVote?.currentUserVote ||
                                          voteType.positive.name,
                                  },
                              }
                            : book
                    )
                );
                setBook({
                    ...book,
                    amountVote: {
                        negative: book.amountVote?.negative || 0,
                        positive: book.amountVote ? book.amountVote.positive + 1 : 1,
                        currentUserVote: book.amountVote?.currentUserVote || voteType.positive.name,
                    },
                });
            })
            .catch((err) => {
                if (err.response.data.message === isAlreadyVotedMessage) {
                    enqueueSnackbar('You have already voted this book!', {
                        variant: 'warning',
                    });
                } else {
                    defaultErrorSnackbar();
                }
            });
    };

    return {
        onNegativeVote: negativeVoteHandler,
        onPositiveVote: positiveVoteHandler,
    };
};
