export const TestPhoto = {
    getData() {
        return [
            {
                itemImageSrc: 'https://scontent.fkdt3-1.fna.fbcdn.net/v/t39.30808-6/340499879_189998420019360_5553797364143343676_n.jpg?stp=dst-jpg_p526x296&_nc_cat=106&ccb=1-7&_nc_sid=5cd70e&_nc_eui2=AeHdJuDe_GGwB87ot5wI6DVshojSralAeI-GiNKtqUB4j3EkoEogaI0zY6u0RDGeCzffcB6DMyGu65nlKQiz7XlH&_nc_ohc=y5B9QZwWhagAX9TFx6q&_nc_ht=scontent.fkdt3-1.fna&oh=00_AfDxQgC9rZ20yS9yCx2RmATBbntxKGXQZS14J0x_hnxVnQ&oe=643A6573',
                thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria1s.jpg',
                alt: 'Description for Image 1',
                title: 'Title 1'
            },
            {
                itemImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria2.jpg',
                thumbnailImageSrc: 'https://scontent.fkdt3-1.fna.fbcdn.net/v/t39.30808-6/340499879_189998420019360_5553797364143343676_n.jpg?stp=dst-jpg_p526x296&_nc_cat=106&ccb=1-7&_nc_sid=5cd70e&_nc_eui2=AeHdJuDe_GGwB87ot5wI6DVshojSralAeI-GiNKtqUB4j3EkoEogaI0zY6u0RDGeCzffcB6DMyGu65nlKQiz7XlH&_nc_ohc=y5B9QZwWhagAX9TFx6q&_nc_ht=scontent.fkdt3-1.fna&oh=00_AfDxQgC9rZ20yS9yCx2RmATBbntxKGXQZS14J0x_hnxVnQ&oe=643A6573',
                alt: 'Description for Image 2',
                title: 'Title 2'
            },
            {
                itemImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria3.jpg',
                thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria3s.jpg',
                alt: 'Description for Image 3',
                title: 'Title 3'
            },
            {
                itemImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria4.jpg',
                thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria4s.jpg',
                alt: 'Description for Image 4',
                title: 'Title 4'
            },
            {
                itemImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria5.jpg',
                thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria5s.jpg',
                alt: 'Description for Image 5',
                title: 'Title 5'
            },
            {
                itemImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria6.jpg',
                thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria6s.jpg',
                alt: 'Description for Image 6',
                title: 'Title 6'
            },
            {
                itemImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria7.jpg',
                thumbnailImageSrc: 'https://primefaces.org/cdn/primereact/images/galleria/galleria7s.jpg',
                alt: 'Description for Image 7',
                title: 'Title 7'
            },
           
        ];
    },

    getImages() {
        return Promise.resolve(this.getData());
    }
};