<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    // Lista svih recenzija za film
    public function index($movieId)
    {
        $movie = Movie::findOrFail($movieId);
        return response()->json($movie->reviews()->with('user')->get(), 200);
    }

    // Kreiranje nove recenzije
    public function store(Request $request, $movieId)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:10',
            'comment' => 'nullable|string|max:1000'
        ]);

        $movie = Movie::findOrFail($movieId);

        $review = Review::create([
            'user_id' => Auth::id(),
            'movie_id' => $movie->id,
            'rating' => $request->rating,
            'comment' => $request->comment
        ]);

        return response()->json($review->load('user'), 201);
    }

    // Prikaz jedne recenzije
    public function show($id)
    {
        $review = Review::with('user', 'movie')->findOrFail($id);
        return response()->json($review, 200);
    }

    // Ažuriranje recenzije
    public function update(Request $request, $id)
    {
        $review = Review::findOrFail($id);

        if ($review->user_id != Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'rating' => 'sometimes|required|integer|min:1|max:10',
            'comment' => 'nullable|string|max:1000'
        ]);

        $review->update($request->only('rating', 'comment'));

        return response()->json($review, 200);
    }

    // Brisanje recenzije
    public function destroy($id)
    {
        $review = Review::findOrFail($id);

        if ($review->user_id != Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $review->delete();
        return response()->json(['message' => 'Review deleted'], 200);
    }
}
