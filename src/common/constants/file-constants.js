export const MAX_SIZE = 5242880; //5MB

export const MimeType = {
    PNG: 'image/png',
    JPEG: 'image/jpeg',
    JPG: 'image/jpg',
    BMP: 'image/bmp',
    TIFF: 'image/tiff',
    GIF: 'image/gif',
    PDF: 'application/pdf',
    ODT: 'application/vnd.oasis.opendocument.text',
    DOC: 'application/msword',
    DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    RTF: 'application/rtf',
    TXT: 'text/plain',
    XLS: 'application/vnd.ms-excel',
    XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    PPT: 'application/vnd.ms-powerpoint',
    PPTX: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    PPS: 'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
    ZIP: 'application/zip'
}

export const allowedImagesTypes = [MimeType.JPG, MimeType.JPEG, MimeType.PNG, MimeType.GIF];