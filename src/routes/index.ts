import { Router, Request, Response } from 'express';
import Movie from '../models/Movie';

interface CreateMovieRequestBody {
    title: string;
    genre: string;
    rating: number;
    streamingLink: string;
}

interface UpdateMovieRequestBody {
    title?: string;
    genre?: string;
    rating?: number;
    streamingLink?: string;
}

const router = Router();

router.get('/movies', async (req: Request, res: Response) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/search', async (req: Request, res: Response) => {
    const query = req.query.q as string;
    try {
        const movies = await Movie.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { genre: { $regex: query, $options: 'i' } }
            ]
        });
        res.json(movies);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/movies', async (req: Request, res: Response) => {
    console.log("🚀 ~ router.post ~ req:", req.body)
    try {
        const { title, genre, rating, streamingLink }: CreateMovieRequestBody = req.body;
        const newMovie = new Movie({ title, genre, rating, streamingLink });
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/movies/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, genre, rating, streamingLink }: UpdateMovieRequestBody = req.body;
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(id, { title, genre, rating, streamingLink }, { new: true });
        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(updatedMovie);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/movies/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json({ message: 'Movie deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
