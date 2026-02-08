#!/bin/bash
# List all books of the Bible in order

books=(
    # Old Testament
    "Genesis"
    "Exodus"
    "Leviticus"
    "Numbers"
    "Deuteronomy"
    "Joshua"
    "Judges"
    "Ruth"
    "1 Samuel"
    "2 Samuel"
    "1 Kings"
    "2 Kings"
    "1 Chronicles"
    "2 Chronicles"
    "Ezra"
    "Nehemiah"
    "Esther"
    "Job"
    "Psalms"
    "Proverbs"
    "Ecclesiastes"
    "Song of Solomon"
    "Isaiah"
    "Jeremiah"
    "Lamentations"
    "Ezekiel"
    "Daniel"
    "Hosea"
    "Joel"
    "Amos"
    "Obadiah"
    "Jonah"
    "Micah"
    "Nahum"
    "Habakkuk"
    "Zephaniah"
    "Haggai"
    "Zechariah"
    "Malachi"
    # New Testament
    "Matthew"
    "Mark"
    "Luke"
    "John"
    "Acts"
    "Romans"
    "1 Corinthians"
    "2 Corinthians"
    "Galatians"
    "Ephesians"
    "Philippians"
    "Colossians"
    "1 Thessalonians"
    "2 Thessalonians"
    "1 Timothy"
    "2 Timothy"
    "Titus"
    "Philemon"
    "Hebrews"
    "James"
    "1 Peter"
    "2 Peter"
    "1 John"
    "2 John"
    "3 John"
    "Jude"
    "Revelation"
)

i=1
for book in "${books[@]}"; do
    echo "Translate $book -- #$i"
    # Clear planning files from previous iteration
    > findings.md
    > progress.md
    > task_plan.md
    ~/.local/bin/claude --allow-dangerously-skip-permissions -p "/translate:do $book"
    ((i++))
done

echo ""
echo "Total: ${#books[@]} books"
