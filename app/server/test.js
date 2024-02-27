const request = require('supertest');
const app = require('./server');

describe('POST /api/moderation/predict', () => {
    test('responds with JSON and correct data when text is provided', async () => {
        const response = await request(app)
            .post('/api/moderation/predict')
            .query({ text: 'une phrase' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('prediction');
        expect(response.body).toHaveProperty('text', 'une phrase');
        expect(response.body).toHaveProperty('language', 'fr-FR');
    });

    test('responds with error when no text is provided', async () => {
        const response = await request(app)
            .post('/api/moderation/predict');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('error', 'No Text Provided');
    });
});

describe('POST /api/moderation/score', () => {
    test('responds with JSON and correct data when text is provided', async () => {
        const response = await request(app)
            .post('/api/moderation/score')
            .query({ text: 'une phrase' });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('score');
        expect(response.body).toHaveProperty('text', 'une phrase');
        expect(response.body).toHaveProperty('language', 'fr-FR');
    });

    test('responds with error when no text is provided', async () => {
        const response = await request(app)
            .post('/api/moderation/score');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('error', 'No Text Provided');
    });
});
