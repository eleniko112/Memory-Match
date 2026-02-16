# **App Name**: MatchMasters

## Core Features:

- Game Board & Card Management: Initializes and shuffles the 4x4 card grid at game start, dynamically updating card states (flipped, matched) based on player actions.
- Player Turn & Match Logic: Manages turn-taking between Player 1 and Player 2, checks if two flipped cards match, updates scores accordingly, and handles non-matching cards flipping back after a delay.
- Card Interaction & Visual Feedback: Enables clicking to flip cards, displays a CSS transform animation for card flips, and disables interaction during the flip-back delay or when the game is finished.
- Real-time Score & Turn Display: Presents the current player's turn and the live scores for both players on the screen.
- Game End & Winner Determination: Detects when all card pairs have been matched, calculates the final scores, and displays the winner or declares a draw.
- Responsive Layout: Ensures the 4x4 card grid and other UI elements adapt responsively to various screen sizes.
- Restart Game Functionality: Provides a 'Restart Game' button that resets all game states, including the board, scores, and turn order, to begin a new game.

## Style Guidelines:

- Primary color: A warm, inviting coral for key interactive elements, reflecting the engaging nature of the game. HSL(15, 80%, 55%) converted to RGB hex: #DE5E3C.
- Background color: A very light, subtle tint of the primary hue for a clean, bright, and focus-enhancing canvas. HSL(15, 20%, 95%) converted to RGB hex: #F9F1EF.
- Accent color: A deep, rich berry analogous to the primary, providing strong contrast for highlights and emphasis. HSL(345, 70%, 45%) converted to RGB hex: #C0265D.
- Body and headline font: 'Inter' (sans-serif) for its modern, clear, and neutral readability across all game information like scores, turns, and titles.
- Utilize a consistent set of simple, distinct, and expressive icons or emojis for card values to ensure quick recognition and a playful feel, as exemplified by the user's suggestions (e.g., 🍎 🍌 ⭐).
- The main game board should be a responsive 4x4 grid, centered on the screen, with a clear separation for player scores and current turn indicators above or below the grid.
- Implement a smooth CSS transform-based flip animation for cards when they are clicked, providing clear visual feedback and adding to the game's interactive appeal.