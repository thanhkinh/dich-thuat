#!/bin/bash
# Query glossary by term
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
grep -i "$1" "$SCRIPT_DIR/../GLOSSARY.md"
