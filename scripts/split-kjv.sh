#!/bin/bash
# Split kjv.txt into OT-XX/NT-XX/[chapter].yaml files

set -e

INPUT="translations/kjv/kjv.txt"
OUTPUT_DIR="translations/kjv"

get_testament_code() {
  case "$1" in
    Genesis) echo "OT-01" ;;
    Exodus) echo "OT-02" ;;
    Leviticus) echo "OT-03" ;;
    Numbers) echo "OT-04" ;;
    Deuteronomy) echo "OT-05" ;;
    Joshua) echo "OT-06" ;;
    Judges) echo "OT-07" ;;
    Ruth) echo "OT-08" ;;
    "1 Samuel") echo "OT-09" ;;
    "2 Samuel") echo "OT-10" ;;
    "1 Kings") echo "OT-11" ;;
    "2 Kings") echo "OT-12" ;;
    "1 Chronicles") echo "OT-13" ;;
    "2 Chronicles") echo "OT-14" ;;
    Ezra) echo "OT-15" ;;
    Nehemiah) echo "OT-16" ;;
    Esther) echo "OT-17" ;;
    Job) echo "OT-18" ;;
    Psalms|Psalm) echo "OT-19" ;;
    Proverbs) echo "OT-20" ;;
    Ecclesiastes) echo "OT-21" ;;
    "Song of Solomon") echo "OT-22" ;;
    Isaiah) echo "OT-23" ;;
    Jeremiah) echo "OT-24" ;;
    Lamentations) echo "OT-25" ;;
    Ezekiel) echo "OT-26" ;;
    Daniel) echo "OT-27" ;;
    Hosea) echo "OT-28" ;;
    Joel) echo "OT-29" ;;
    Amos) echo "OT-30" ;;
    Obadiah) echo "OT-31" ;;
    Jonah) echo "OT-32" ;;
    Micah) echo "OT-33" ;;
    Nahum) echo "OT-34" ;;
    Habakkuk) echo "OT-35" ;;
    Zephaniah) echo "OT-36" ;;
    Haggai) echo "OT-37" ;;
    Zechariah) echo "OT-38" ;;
    Malachi) echo "OT-39" ;;
    Matthew) echo "NT-01" ;;
    Mark) echo "NT-02" ;;
    Luke) echo "NT-03" ;;
    John) echo "NT-04" ;;
    Acts) echo "NT-05" ;;
    Romans) echo "NT-06" ;;
    "1 Corinthians") echo "NT-07" ;;
    "2 Corinthians") echo "NT-08" ;;
    Galatians) echo "NT-09" ;;
    Ephesians) echo "NT-10" ;;
    Philippians) echo "NT-11" ;;
    Colossians) echo "NT-12" ;;
    "1 Thessalonians") echo "NT-13" ;;
    "2 Thessalonians") echo "NT-14" ;;
    "1 Timothy") echo "NT-15" ;;
    "2 Timothy") echo "NT-16" ;;
    Titus) echo "NT-17" ;;
    Philemon) echo "NT-18" ;;
    Hebrews) echo "NT-19" ;;
    James) echo "NT-20" ;;
    "1 Peter") echo "NT-21" ;;
    "2 Peter") echo "NT-22" ;;
    "1 John") echo "NT-23" ;;
    "2 John") echo "NT-24" ;;
    "3 John") echo "NT-25" ;;
    Jude) echo "NT-26" ;;
    Revelation) echo "NT-27" ;;
    *) echo "UNKNOWN" ;;
  esac
}

declare -A seen

tail -n +3 "$INPUT" | while IFS=$'\t' read -r ref text; do
  # Parse "Genesis 1:1" -> book=Genesis, chapter=1, verse=1
  book=$(echo "$ref" | sed -E 's/ [0-9]+:[0-9]+$//')
  cv=$(echo "$ref" | grep -oE '[0-9]+:[0-9]+$')
  chapter=$(echo "$cv" | cut -d: -f1)
  verse=$(echo "$cv" | cut -d: -f2)

  testament_code=$(get_testament_code "$book")
  chapter_pad=$(printf "%02d" "$chapter")
  book_output_dir="$OUTPUT_DIR/$testament_code"
  mkdir -p "$book_output_dir"
  output="$book_output_dir/${chapter_pad}.yaml"

  # Write header if first verse
  if [[ -z "${seen[$output]}" ]]; then
    echo "${chapter}:" > "$output"
    seen[$output]=1
  fi

  # Escape quotes
  text=$(echo "$text" | sed 's/"/\\"/g')
  printf '  %s: "%s"\n' "$verse" "$text" >> "$output"
done

echo "Done. Files in $OUTPUT_DIR"
ls -1 "$OUTPUT_DIR" | head -20
