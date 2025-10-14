<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    // Lista svih recenzija za film
    public function index(Movie $movie)
    {
        return response()->json($movie->reviews()->with('user')->get(), 200);
    }

    // Kreiranje nove recenzije
    public function store(Request $request, Movie $movie)
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:10',
            'comment' => 'nullable|string|max:1000'
        ]);

        $review = $movie->reviews()->create([
            'user_id' => Auth::id(),
            'rating' => $request->rating,
            'comment' => $request->comment
        ]);

        return response()->json($review->load('user'), 201);
    }

    // Prikaz jedne recenzije
    public function show(Review $review)
    {
        return response()->json($review->load('user', 'movie'), 200);
    }

    // Ažuriranje recenzije
    public function update(Request $request, Review $review)
    {
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
    public function destroy(Review $review)
    {
        if ($review->user_id != Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $review->delete();
        return response()->json(['message' => 'Review deleted'], 200);
    }
}
