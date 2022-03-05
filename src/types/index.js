import PropTypes from 'prop-types';

const { shape, number, string, object, bool } = PropTypes;

const bookTypes = shape({
    id: number.isRequired,
    title: string.isRequired,
    author: string.isRequired,
    fileInfo: object,
    category: shape({
        id: number,
        name: string,
    }).isRequired,
    language: shape({
        id: number,
        name: string,
    }).isRequired,
    description: string.isRequired,
    link: string,
    status: shape({
        id: number,
        name: string,
    }).isRequired,
    rate: number.isRequired,
    reader: bool,
    owner: shape({
        corpEmail: string.isRequired,
        googleEmail: string.isRequired,
        id: number.isRequired,
        name: string.isRequired,
        surname: string.isRequired,
    }),
});

const userTypes = shape({
    id: number.isRequired,
    name: string.isRequired,
    surname: string.isRequired,
    fileInfo: object,
    corpEmail: string.isRequired,
    googleEmail: string.isRequired,
});

const suggestedBookTypes = shape({
    id: number.isRequired,
    title: string.isRequired,
    author: string,
    category: shape({
        id: number,
        name: string,
    }),
    language: shape({
        id: number,
        name: string,
    }),
    comment: string.isRequired,
    link: string,
    status: shape({
        id: number,
        name: string,
    }).isRequired,
    creator: shape({
        corpEmail: string.isRequired,
        googleEmail: string.isRequired,
        id: number.isRequired,
        name: string.isRequired,
        surname: string.isRequired,
    }),
    createDate: PropTypes.arrayOf(PropTypes.number),
});

export const types = {
    bookTypes,
    userTypes,
    suggestedBookTypes,
};
