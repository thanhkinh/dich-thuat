#!/bin/bash
# GLOSSARY.yaml Term Lookup Utility
# Usage: ./lookup-term.sh <term> [context]
#   term: English term to lookup
#   context: Optional context hint (prayer, narrative, divine, etc.)

GLOSSARY_FILE="GLOSSARY.yaml"

if [ ! -f "$GLOSSARY_FILE" ]; then
    echo "Error: $GLOSSARY_FILE not found"
    exit 1
fi

TERM="$1"
CONTEXT="$2"

if [ -z "$TERM" ]; then
    echo "Usage: $0 <term> [context]"
    echo ""
    echo "Examples:"
    echo "  $0 show           # Basic lookup"
    echo "  $0 show prayer    # Context-aware lookup"
    echo "  $0 show divine    # Context-aware lookup"
    exit 1
fi

# Convert to lowercase for case-insensitive search
TERM_LOWER=$(echo "$TERM" | tr '[:upper:]' '[:lower:]')

# Parse YAML and display term information
echo "=== GLOSSARY Lookup: $TERM ==="
echo ""

# Use awk to parse YAML (simplified approach)
awk -v term="$TERM_LOWER" -v context="$CONTEXT" '
BEGIN {
    found = 0
    in_terms = 0
    current_term = ""
    current_variants = ""
}

/^terms:/ {
    in_terms = 1
    next
}

/^  - term:/ && in_terms {
    if (found) exit
    current_term = tolower($0)
    gsub(/^  - term: *["\x27]?|["\x27]?$/, "", current_term)
    if (current_term == term) {
        found = 1
        print "Term: " current_term
    }
    next
}

found && /^    category:/ {
    gsub(/^    category: *["\x27]?|["\x27]?$/, "")
    print "Category: " $0
    next
}

found && /^    variants:/ {
    gsub(/^    variants: */, "")
    gsub(/^\[|\]$/, "")
    print "Variants: " $0
    next
}

found && /^    translations:/ {
    print ""
    print "Translations:"
    in_trans = 1
    next
}

found && in_trans && /^      - vietnamese:/ {
    gsub(/^      - vietnamese: *["\x27]?|["\x27]?$/, "")
    vt = $0
    print "  - " vt
    next
}

found && in_trans && /^        register:/ {
    gsub(/^        register: *["\x27]?|["\x27]?$/, "")
    print "    Register: " $0
    next
}

found && in_trans && /^        context:/ {
    gsub(/^        context: *["\x27]?|["\x27]?$/, "")
    print "    Context: " $0
    next
}

found && in_trans && /^        use_when:/ {
    gsub(/^        use_when: *["\x27]?|["\x27]?$/, "")
    print "    Use when: " $0
    next
}

found && in_trans && /^        primary:/ {
    gsub(/^        primary: */, "")
    if ($0 == "true") print "    [PRIMARY]"
    next
}

found && /^    alternatives:/ {
    in_trans = 0
    print ""
    print "Alternatives:"
    next
}

found && /^    alternatives:/,/^    [a-z_]+:/ {
    if (/^      - vietnamese:/) {
        gsub(/^      - vietnamese: *["\x27]?|["\x27]?$/, "")
        print "  - " $0
    } else if (/^        use_when:/) {
        gsub(/^        use_when: *["\x27]?|["\x27]?$/, "")
        print "    Use when: " $0
    }
    next
}

found && /^    decision_tree:/ {
    in_trans = 0
    print ""
    print "Decision Tree:"
    next
}

found && /^    decision_tree:/,/^    [a-z_]+:/ {
    if (/^      - condition:/) {
        gsub(/^      - condition: *["\x27]?|["\x27]?$/, "")
        print "  IF " $0
    } else if (/^        use:/) {
        gsub(/^        use: *["\x27]?|["\x27]?$/, "")
        print "    THEN use: " $0
    }
    next
}

found && /^    avoid:/ {
    in_trans = 0
    print ""
    print "Avoid:"
    next
}

found && /^    avoid:/,/^    [a-z_]+:/ {
    if (/^      - term:/) {
        gsub(/^      - term: *["\x27]?|["\x27]?$/, "")
        print "  - " $0
    } else if (/^        reason:/) {
        gsub(/^        reason: *["\x27]?|["\x27]?$/, "")
        print "    Reason: " $0
    }
    next
}

found && /^    notes:/ {
    in_trans = 0
    gsub(/^    notes: *["\x27]?|["\x27]?$/, "")
    print ""
    print "Notes: " $0
    next
}
' "$GLOSSARY_FILE"

if [ $? -ne 0 ] || ! grep -qi "term:.*$TERM" "$GLOSSARY_FILE"; then
    echo "Term not found in glossary"
    echo ""
    echo "Similar terms (grep):"
    grep -i "term:" "$GLOSSARY_FILE" | grep -i "$TERM" | head -5
fi

echo ""
