<?php

namespace App\Http\Controllers;

use App\Models\Watchlist;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WatchlistController extends Controller
{
    // Lista svih filmova u watchlist korisnika
    public function index()
    {
        $watchlist = Watchlist::with('movie')->where('user_id', Auth::id())->get();
        return response()->json($watchlist, 200);
    }

    // Dodavanje filma u watchlist
    public function store(Request $request)
    {
        $request->validate([
            'movie_id' => 'required|exists:movies,id'
        ]);

        $watchlistItem = Watchlist::firstOrCreate([
            'user_id' => Auth::id(),
            'movie_id' => $request->movie_id
        ]);

        return response()->json($watchlistItem->load('movie'), 201);
    }

    // Brisanje filma iz watchlist
    public function destroy($id)
    {
        $watchlistItem = Watchlist::where('user_id', Auth::id())->where('movie_id', $id)->firstOrFail();
        $watchlistItem->delete();

        return response()->json(['message' => 'Movie removed from watchlist'], 200);
    }
}
