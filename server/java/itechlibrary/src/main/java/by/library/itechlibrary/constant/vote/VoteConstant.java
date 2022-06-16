package by.library.itechlibrary.constant.vote;

import by.library.itechlibrary.entity.vote.VoteObjectType;
import by.library.itechlibrary.entity.vote.VoteType;

import java.util.Set;

public final class VoteConstant {

    private VoteConstant() {
    }

    public static final String VOTE_TYPE_POSITIVE_NAME = "POSITIVE";
    public static final String VOTE_TYPE_NEGATIVE_NAME = "NEGATIVE";

    private static final VoteObjectType SUGGESTED_VOTE_OBJECT_TYPE = new VoteObjectType((short) 1, "SUGGESTED_BOOK");

    public static final VoteType POSITIVE_VOTE_TYPE = new VoteType((short) 1, VOTE_TYPE_POSITIVE_NAME);
    public static final VoteType NEGATIVE_VOTE_TYPE = new VoteType((short) 2, VOTE_TYPE_NEGATIVE_NAME);

    public static final Set<VoteType> VOTE_TYPES = Set.of(POSITIVE_VOTE_TYPE, NEGATIVE_VOTE_TYPE);
    public static final Set<VoteObjectType> VOTE_OBJECT_TYPES = Set.of(SUGGESTED_VOTE_OBJECT_TYPE);

    public static final short VOTE_STEP = (short) 1;

}
