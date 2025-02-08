interface Catalogue {
    books: Book[];
}

interface Book {
    category: string;
    pages: Page[];
}

interface Page {
    title: string;
    contents: [string];
}