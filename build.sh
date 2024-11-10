#!/bin/bash
yarn install
yarn build
tar -cvf ./deploy.tar --exclude='*.map' --exclude='.yarn' --exclude='src' --exclude='e2e' --exclude='playwright' --exclude='playwright-report' --exclude='tests' --exclude='test-results' --exclude='node_modules' ./*

# Verify the tarball
if tar -tf ./deploy.tar > /dev/null; then
    echo "Tarball created successfully."
else
    echo "Error creating tarball."
    exit 1
fi

caprover deploy -t ./deploy.tar
