const db = require("../src/models");

beforeAll(async () => {
    await db.sequelize.sync({ force: true });
});

test('create user', async () => {
    expect.assertions(4);
    const user = await db.user.create({
        id: 1,
        username: 'kwenamokgohlwa',
        password: '12345678',
        pseudonym: 'Motsumi',
    });

    expect(user.id).toEqual(1);
    expect(user.username).toEqual('kwenamokgohlwa');
    expect(user.password).toEqual('12345678');
    expect(user.pseudonym).toEqual('Motsumi');
});

test('create book', async () => {
    expect.assertions(6);
    const book = await db.book.create({
        id: 1,
        author: 1,
        title: 'Forty-Two: 42',
        description: 'The Coders Guide to the Galaxy',
        price: 424.24,
        image: 'image/9782123456803.png'
    });
    
    expect(book.id).toEqual(1);
    expect(book.author).toEqual(1);
    expect(book.title).toEqual('Forty-Two: 42');
    expect(book.description).toEqual('The Coders Guide to the Galaxy');
    expect(book.price).toEqual(424.24);
    expect(book.image).toEqual('image/9782123456803.png');
});

test('get book', async () => {
    expect.assertions(6);
    const book = await db.book.findByPk(1);

    expect(book.id).toEqual(1);
    expect(book.author).toEqual(1);
    expect(book.title).toEqual('Forty-Two: 42');
    expect(book.description).toEqual('The Coders Guide to the Galaxy');
    expect(book.price).toEqual(424.24);
    expect(book.image).toEqual('image/9782123456803.png');
});

test('delete book', async () => {
    expect.assertions(1);
    await db.book.destroy({
        where: {
            id: 1
        }
    });

    const book = await db.book.findByPk(1);
    expect(book).toBeNull();
});

afterAll(async () => {
    await db.sequelize.close();
});
