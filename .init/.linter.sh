#!/bin/bash
cd /home/kavia/workspace/code-generation/fullstack-crud-demo-147709-147732/sample_crud_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

