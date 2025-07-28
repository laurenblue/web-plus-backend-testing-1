import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  const post: Omit<Post, 'id' | 'date'> = {
    text: 'Mocked post',
  };

  beforeEach(async () => {
    postsService = new PostsService();
    postsService.create({ text: 'Some pre-existing post' });
  });

  it('should add a new post', () => {
    const newPost = postsService.create(post);

    expect(newPost).toHaveProperty('id');
    expect(newPost).toHaveProperty('date');
    expect(newPost.text).toBe(post.text);

    const foundPost = postsService.find(newPost.id);
    expect(foundPost).toEqual(newPost);
  });

  it('should find a post', () => {
    const createdPost = postsService.create({ text: 'Test find post' });

    const foundPost = postsService.find(createdPost.id);

    expect(foundPost).toBeDefined();
    expect(foundPost?.id).toBe(createdPost.id);
    expect(foundPost?.text).toBe(createdPost.text);
  });
});
