<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    // Lista svih žanrova
    public function index()
    {
        return response()->json(Genre::all(), 200);
    }

    // Kreiranje novog žanra
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100'
        ]);

        $genre = Genre::create($request->only('name'));
        return response()->json($genre, 201);
    }

    // Prikaz jednog žanra
    public function show($id)
    {
        $genre = Genre::with('movies')->findOrFail($id);
        return response()->json($genre, 200);
    }

    // Ažuriranje žanra
    public function update(Request $request, $id)
    {
        $genre = Genre::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:100'
        ]);

        $genre->update($request->only('name'));
        return response()->json($genre, 200);
    }

    // Brisanje žanra
    public function destroy($id)
    {
        $genre = Genre::findOrFail($id);
        $genre->movies()->detach();
        $genre->delete();

        return response()->json(['message' => 'Genre deleted'], 200);
    }
}
