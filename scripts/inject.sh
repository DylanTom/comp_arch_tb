#!/bin/bash

# Inputs
file_path="./cms/tb.v"
insert_line_number=1
new_code='echo "Hello, World!"'

# Backup the original file
cp "$file_path" "$file_path.bak"

# Insert code
sed -i '' "${insert_line_number}a\\
${new_code}" "$file_path"

echo "Code inserted at line ${insert_line_number}"