FROM oven/bun:latest

RUN apt-get update && apt-get install -y git curl && rm -rf /var/lib/apt/lists/*
RUN groupadd -r bunuser && useradd -r -g bunuser -m bunuser
RUN chown -R bunuser:bunuser /home/bun

USER bunuser
ENV PATH=/home/bunuser/.local/bin:$PATH
RUN curl -fsSL https://claude.ai/install.sh | bash

WORKDIR /workspace
