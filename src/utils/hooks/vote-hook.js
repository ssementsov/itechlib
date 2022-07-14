import { Vote } from '../../models/vote-model';
import {
    voteObjectTypes,
    voteType,
    isAlreadyVotedMessage,
} from '../../common/constants/vote-constants';
import { VoteAPI } from '../../api/vote-api';
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
                                  suggestedBookVoteCounter: {
                                      negativeCount:
                                          book.suggestedBookVoteCounter.negativeCount + 1,
                                      positiveCount:
                                          book.suggestedBookVoteCounter.positiveCount || 0,
                                      currentUserVoteType:
                                          book.suggestedBookVoteCounter.currentUserVoteType ||
                                          voteType.negative.name,
                                  },
                              }
                            : book;
                    })
                );
                if(book.length) {
                    setBook({
                        ...book,
                        suggestedBookVoteCounter: {
                            negativeCount: book.suggestedBookVoteCounter.negativeCount + 1,
                            positiveCount: book.suggestedBookVoteCounter.positiveCount || 0,
                            currentUserVoteType:
                                book.suggestedBookVoteCounter.currentUserVoteType ||
                                voteType.negative.name,
                        },
                    });
                }
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
                                  suggestedBookVoteCounter: {
                                      negativeCount:
                                          book.suggestedBookVoteCounter.negativeCount,
                                      positiveCount:
                                          book.suggestedBookVoteCounter.positiveCount + 1,
                                      currentUserVoteType:
                                          book.suggestedBookVoteCounter.currentUserVoteType ||
                                          voteType.positive.name,
                                  },
                              }
                            : book
                    )
                );
                if(book.length) {
                    setBook({
                        ...book,
                        suggestedBookVoteCounter: {
                            negativeCount: book.suggestedBookVoteCounter.negativeCount,
                            positiveCount: book.suggestedBookVoteCounter.positiveCount + 1,
                            currentUserVoteType:
                                book.suggestedBookVoteCounter.currentUserVoteType ||
                                voteType.positive.name,
                        },
                    });
                }
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
