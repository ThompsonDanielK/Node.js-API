import { CommentModel } from '../../app/models/comments.model';

describe('Testing Comment Model', () => {
    test('It creates comments.', async () => {
        const currentDate = new Date(); 
        const ops = {
            id: '1',
            content: 'test',
            created_time: currentDate,
            updated_time: currentDate,
            user_id: 1,
            post_id: 1
        };

        const expected = {
            id: '1',
            content: 'test',
            created_time: currentDate,
            updated_time: currentDate,
            user_id: 1,
            post_id: 1,
            _id: '1'                      
        };

        jest.spyOn(CommentModel, 'create').mockImplementationOnce(() => Promise.resolve(expected));

        let result =  await CommentModel.create(ops);

        expect(result).toEqual(expected);
    });
});