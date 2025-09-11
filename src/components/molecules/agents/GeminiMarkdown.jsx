
const GeminiMarkdown = ({ content, className = '' }) => {
    if (!content) return null;

    const parseContent = (text) => {
        const elements = [];
        let currentIndex = 0;

        const segments = splitIntoSegments(text);

        segments.forEach((segment) => {
            if (segment.type === 'code') {
                elements.push(
                    <div key={currentIndex++} className="my-4">
                        <pre className="bg-gray-100 dark:bg-neutral-900 rounded-lg p-4 overflow-x-auto">
                            <code className={`language-${segment.language || 'javascript'}`}>
                                {segment.content}
                            </code>
                        </pre>
                    </div>
                );
            } else if (segment.type === 'text') {
                const lines = segment.content.split('\n');

                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];

                    if (line.startsWith('# ')) {
                        elements.push(
                            <h1 key={currentIndex++} className="text-3xl font-bold mt-6 mb-4">
                                {parseInlineFormatting(line.substring(2))}
                            </h1>
                        );
                    } else if (line.startsWith('## ')) {
                        elements.push(
                            <h2 key={currentIndex++} className="text-2xl font-bold mt-5 mb-3">
                                {parseInlineFormatting(line.substring(3))}
                            </h2>
                        );
                    } else if (line.startsWith('### ')) {
                        elements.push(
                            <h3 key={currentIndex++} className="text-xl font-bold mt-4 mb-2">
                                {parseInlineFormatting(line.substring(4))}
                            </h3>
                        );
                    }
                    else if (line.match(/^[\*\-\+]\s/)) {
                        const listItems = [line];
                        while (i + 1 < lines.length && lines[i + 1].match(/^[\*\-\+]\s/)) {
                            i++;
                            listItems.push(lines[i]);
                        }

                        elements.push(
                            <ul key={currentIndex++} className="list-disc pl-6 my-3 space-y-1">
                                {listItems.map((item, idx) => (
                                    <li key={idx}>
                                        {parseInlineFormatting(item.replace(/^[\*\-\+]\s/, ''))}
                                    </li>
                                ))}
                            </ul>
                        );
                    }
                    else if (line.match(/^\d+\.\s/)) {
                        const listItems = [line];
                        while (i + 1 < lines.length && lines[i + 1].match(/^\d+\.\s/)) {
                            i++;
                            listItems.push(lines[i]);
                        }

                        elements.push(
                            <ol key={currentIndex++} className="list-decimal pl-6 my-3 space-y-1">
                                {listItems.map((item, idx) => (
                                    <li key={idx}>
                                        {parseInlineFormatting(item.replace(/^\d+\.\s/, ''))}
                                    </li>
                                ))}
                            </ol>
                        );
                    }
                    else if (line.startsWith('> ')) {
                        const quoteLines = [line.substring(2)];
                        while (i + 1 < lines.length && lines[i + 1].startsWith('> ')) {
                            i++;
                            quoteLines.push(lines[i].substring(2));
                        }

                        elements.push(
                            <blockquote key={currentIndex++} className="border-l-4 border-blue-400 pl-4 py-2 my-4 bg-blue-50 italic">
                                {quoteLines.map((quoteLine, idx) => (
                                    <div key={idx}>{parseInlineFormatting(quoteLine)}</div>
                                ))}
                            </blockquote>
                        );
                    }
                    else if (line.match(/^---+$/) || line.match(/^\*\*\*+$/)) {
                        elements.push(
                            <hr key={currentIndex++} className="my-6 border-gray-300" />
                        );
                    }
                    else if (line.trim() !== '') {
                        elements.push(
                            <p key={currentIndex++} className="my-3 leading-relaxed">
                                {parseInlineFormatting(line)}
                            </p>
                        );
                    }
                    else if (line.trim() === '' && elements.length > 0) {
                        elements.push(
                            <div key={currentIndex++} className="my-2"></div>
                        );
                    }
                }
            }
        });

        return elements;
    };

    const splitIntoSegments = (text) => {
        const segments = [];
        const lines = text.split('\n');
        let currentSegment = { type: 'text', content: '', language: '' };
        let inCodeBlock = false;
        let codeBlockContent = [];
        let codeLanguage = '';

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            if (line.startsWith('```')) {
                if (!inCodeBlock) {
                    if (currentSegment.content.trim()) {
                        segments.push({ ...currentSegment });
                        currentSegment = { type: 'text', content: '', language: '' };
                    }

                    inCodeBlock = true;
                    codeLanguage = line.substring(3).trim();
                    codeBlockContent = [];
                } else {
                    inCodeBlock = false;
                    segments.push({
                        type: 'code',
                        content: codeBlockContent.join('\n'),
                        language: codeLanguage
                    });
                    codeBlockContent = [];
                    codeLanguage = '';
                }
                continue;
            }

            if (inCodeBlock) {
                codeBlockContent.push(line);
                continue;
            }

            if (line.trim() &&
                (line.trim() === 'javascript' || line.trim() === 'python' ||
                    line.trim() === 'java' || line.trim() === 'css' ||
                    line.trim() === 'html' || line.trim() === 'typescript' ||
                    line.trim() === 'jsx' || line.trim() === 'tsx') &&
                i + 1 < lines.length &&
                lines[i + 1].trim() &&
                !lines[i + 1].startsWith('#') &&
                !lines[i + 1].match(/^[\*\-\+]\s/) &&
                !lines[i + 1].match(/^\d+\.\s/)) {

                if (currentSegment.content.trim()) {
                    segments.push({ ...currentSegment });
                }

                const codeLines = [];
                const detectedLanguage = line.trim();
                i++;

                while (i < lines.length) {
                    const codeLine = lines[i];

                    if (codeLine.trim() === '' &&
                        i + 1 < lines.length &&
                        (lines[i + 1].startsWith('#') ||
                            lines[i + 1].startsWith('**') ||
                            lines[i + 1].match(/^\d+\.\s/) ||
                            lines[i + 1].match(/^[A-Z][a-z].*[.!?]$/))) {
                        break;
                    }

                    codeLines.push(codeLine);
                    i++;
                }

                segments.push({
                    type: 'code',
                    content: codeLines.join('\n'),
                    language: detectedLanguage
                });

                currentSegment = { type: 'text', content: '', language: '' };
                i--;
                continue;
            }

            currentSegment.content += (currentSegment.content ? '\n' : '') + line;
        }

        if (currentSegment.content.trim()) {
            segments.push(currentSegment);
        }

        return segments;
    };

    const parseInlineFormatting = (text) => {
        if (!text) return '';

        const parts = [];
        let currentText = text;
        let key = 0;

        const codeRegex = /`([^`]+)`/g;
        let lastIndex = 0;
        let match;

        while ((match = codeRegex.exec(currentText)) !== null) {
            if (match.index > lastIndex) {
                const beforeText = currentText.substring(lastIndex, match.index);
                parts.push(...parseTextFormatting(beforeText, key));
                key += 10;
            }

            parts.push(
                <code key={key++} className="bg-gray-200 dark:bg-neutral-700 px-2 py-1 rounded text-sm font-mono">
                    {match[1]}
                </code>
            );

            lastIndex = match.index + match[0].length;
        }

        if (lastIndex < currentText.length) {
            const remainingText = currentText.substring(lastIndex);
            parts.push(...parseTextFormatting(remainingText, key));
        }

        return parts.length === 1 && typeof parts[0] === 'string' ? parts[0] : parts;
    };

    const parseTextFormatting = (text, startKey = 0) => {
        const parts = [];
        let currentIndex = 0;
        let key = startKey;

        const formatRegex = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(\[([^\]]+)\]\(([^)]+)\))/g;
        let match;

        while ((match = formatRegex.exec(text)) !== null) {
            if (match.index > currentIndex) {
                parts.push(text.substring(currentIndex, match.index));
            }

            if (match[1]) {
                parts.push(
                    <strong key={key++} className="font-bold">
                        {match[2]}
                    </strong>
                );
            } else if (match[3]) {
                parts.push(
                    <em key={key++} className="italic">
                        {match[4]}
                    </em>
                );
            } else if (match[5]) {
                parts.push(
                    <a key={key++} href={match[7]} className="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">
                        {match[6]}
                    </a>
                );
            }

            currentIndex = match.index + match[0].length;
        }

        if (currentIndex < text.length) {
            parts.push(text.substring(currentIndex));
        }

        return parts;
    };

    return (
        <div className={`gemini-output ${className}`}>
            {parseContent(content)}
        </div>
    );

};

export default GeminiMarkdown
