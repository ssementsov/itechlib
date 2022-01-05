package by.library.itechlibrary.constant;

import by.library.itechlibrary.entity.Status;

public final class StatusConstant {

    private StatusConstant() {
    }

    public static final String AVAILABLE = "AVAILABLE";
    public static final String NOT_AVAILABLE = "NOT AVAILABLE";
    public static final String IN_USE = "IN USE";

    public static final Status AVAILABLE_STATUS = new Status((short) 1, AVAILABLE);
    public static final Status NOT_AVAILABLE_STATUS = new Status((short) 2, NOT_AVAILABLE);
    public static final Status IN_USE_STATUS = new Status((short) 3, IN_USE);
}
