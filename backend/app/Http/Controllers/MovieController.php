<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Models\Genre;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    // Lista svih filmova sa žanrovima
    public function index()
    {
        $movies = Movie::with('genres')->get();
        return response()->json($movies, 200);
    }

    // Kreiranje novog filma
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'release_year' => 'nullable|integer',
            'genre_ids' => 'array'
        ]);

        $movie = Movie::create($request->only('title', 'description', 'release_year'));

        if ($request->has('genre_ids')) {
            $movie->genres()->sync($request->genre_ids);
        }

        return response()->json($movie->load('genres'), 201);
    }

    // Prikaz jednog filma
    public function show($id)
    {
        $movie = Movie::with('genres', 'reviews')->findOrFail($id);
        return response()->json($movie, 200);
    }

    // Ažuriranje filma
    public function update(Request $request, $id)
    {
        $movie = Movie::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'release_year' => 'nullable|integer',
            'genre_ids' => 'array'
        ]);

        $movie->update($request->only('title', 'description', 'release_year'));

        if ($request->has('genre_ids')) {
            $movie->genres()->sync($request->genre_ids);
        }

        return response()->json($movie->load('genres'), 200);
    }

    // Brisanje filma
    public function destroy($id)
    {
        $movie = Movie::findOrFail($id);
        $movie->genres()->detach();
        $movie->delete();

        return response()->json(['message' => 'Movie deleted'], 200);
    }
}
