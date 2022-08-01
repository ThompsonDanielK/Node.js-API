import { PostModel } from '../../app/models/posts.model';

describe('Testing Post Model', () => {
    test('It creates posts.', async () => {
        const currentDate = new Date(); 
        const ops = {
            id: '1',
            content: 'test',
            created_time: currentDate,
            updated_time: currentDate,
            user_id: 1
        };

        const expected = {
            id: '1',
            content: 'test',
            created_time: currentDate,
            updated_time: currentDate,
            user_id: 1,
            _id: '1'                      
        };

        jest.spyOn(PostModel, 'create').mockImplementationOnce(() => Promise.resolve(expected));

        let result =  await PostModel.create(ops);

        expect(result).toEqual(expected);
    });
});