import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../src/index';
import MovieModel from '../src/models/Movie';


const mockMovie = {
    title: 'Inception',
    genre: 'Sci-Fi',
    rating: 8.8,
    streamingLink: 'https://example.com/inception',
};

beforeAll(async () => {
    await mongoose.connect('mongodb+srv://rajeshmishra2295:3AB3xr91yh90yDEz@daznassignment.wiczusn.mongodb.net/?appName=daznAssignment');

    // await MovieModel.deleteMany({});
    await MovieModel.create(mockMovie);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('GET /movies', () => {
    it('should fetch all movies', async () => {
        const response = await request(app).get('/movies');
        expect(response.status).toBe(200);
        expect(response.body[0]).toMatchObject({
            _id: expect.anything(),
            title: expect.any(String),
            genre: expect.any(String),
            rating: expect.any(Number),
            streamingLink: expect.any(String),
            __v: expect.any(Number)
        });
    });
});

describe('POST /movies', () => {
    it('should add a new movie', async () => {
        const newMovie = {
            title: 'Interstellar',
            genre: 'Sci-Fi',
            rating: 8.6,
            streamingLink: 'https://example.com/interstellar',
        };
        const response = await request(app).post('/movies').send(newMovie);
        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(newMovie);
    });
});