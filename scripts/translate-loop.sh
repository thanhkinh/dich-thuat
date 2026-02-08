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

    # Determine book directory
    if [ $i -le 39 ]; then
        book_dir="OT-$(printf "%02d" $i)"
    else
        nt_index=$((i - 39))
        book_dir="NT-$(printf "%02d" $nt_index)"
    fi

    # Get chapter count
    kjv_dir="translations/kjv/$book_dir"
    chapter_count=$(ls "$kjv_dir"/*.yaml 2>/dev/null | wc -l)
    echo "  ($book_dir: $chapter_count chapters)"

    # Loop through chapters
    for chapter in $(seq 1 $chapter_count); do
        echo "  > Chapter $chapter"
        # Clear planning files
        > findings.md
        > progress.md
        > task_plan.md
        ~/.local/bin/claude --allow-dangerously-skip-permissions -p "/translate:do $book $chapter"
    done

    ((i++))
done

echo ""
echo "Total: ${#books[@]} books"
