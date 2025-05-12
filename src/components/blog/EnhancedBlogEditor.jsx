import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuthContext } from '../../context/AuthProvider';
import { createEditor, Editor, Transforms, Element as SlateElement } from 'slate';
import { Slate, Editable, withReact, useSlate } from 'slate-react';
import { withHistory } from 'slate-history';
import {
  Box,
  Chip,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Container,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  Grid,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import {
  Edit,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Code,
  FormatQuote,
  FormatListBulleted,
  FormatListNumbered,
  LooksOne,
  LooksTwo,
  Image,
  Save,
  ArrowBack,
  Delete,
  Preview
} from '@mui/icons-material';

// Initial value for the editor
const initialValue = [
  {
    type: 'heading-one',
    children: [{ text: 'Blog Title' }],
  },
  {
    type: 'paragraph',
    children: [{ text: 'Start writing your blog content here...' }],
  },
];

// Custom toolbar button component
const ToolbarButton = ({ format, icon, isBlock = false, isActive, onMouseDown }) => {
  const theme = useTheme();

  return (
    <Tooltip title={format.charAt(0).toUpperCase() + format.slice(1)}>
      <IconButton
        onMouseDown={(event) => onMouseDown(event, format, isBlock)}
        sx={{
          color: isActive ? 'primary.main' : 'text.secondary',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(0, 0, 0, 0.04)'
          }
        }}
        size="small"
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

ToolbarButton.propTypes = {
  format: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  isBlock: PropTypes.bool,
  isActive: PropTypes.bool,
  onMouseDown: PropTypes.func.isRequired,
};

// Block button component that checks if the current selection has the specified block type
const BlockButton = ({ format, icon }) => {
  const editor = useSlate();

  const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
      match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    });
    return !!match;
  };

  const toggleBlock = (event, format) => {
    event.preventDefault();
    const isActive = isBlockActive(editor, format);

    Transforms.setNodes(
      editor,
      { type: isActive ? 'paragraph' : format },
      { match: n => Editor.isBlock(editor, n) }
    );

    // Handle special cases for lists
    if (!isActive && (format === 'bulleted-list' || format === 'numbered-list')) {
      Transforms.wrapNodes(
        editor,
        { type: format, children: [] },
        { match: n => Editor.isBlock(editor, n) && n.type === 'list-item' }
      );
    }
  };

  return (
    <ToolbarButton
      format={format}
      icon={icon}
      isBlock={true}
      isActive={isBlockActive(editor, format)}
      onMouseDown={toggleBlock}
    />
  );
};

BlockButton.propTypes = {
  format: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

// Mark button component that checks if the current selection has the specified mark
const MarkButton = ({ format, icon }) => {
  const editor = useSlate();

  const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  const toggleMark = (event, format) => {
    event.preventDefault();
    const isActive = isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  return (
    <ToolbarButton
      format={format}
      icon={icon}
      isActive={isMarkActive(editor, format)}
      onMouseDown={toggleMark}
    />
  );
};

MarkButton.propTypes = {
  format: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

// Element renderer
const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote style={{ borderLeft: '2px solid #ddd', paddingLeft: '10px', color: '#666' }} {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 style={{ fontSize: '2em', fontWeight: 'bold' }} {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 style={{ fontSize: '1.5em', fontWeight: 'bold' }} {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'image':
      return (
        <div {...attributes}>
          <div contentEditable={false} style={{ textAlign: 'center' }}>
            <img
              src={element.url}
              alt={element.alt || 'Blog image'}
              style={{ maxWidth: '100%', maxHeight: '20em', boxShadow: '0 0 5px rgba(0,0,0,0.1)' }}
            />
          </div>
          {children}
        </div>
      );
    case 'code-block':
      return (
        <pre style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '5px', overflowX: 'auto' }} {...attributes}>
          <code>{children}</code>
        </pre>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

Element.propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  element: PropTypes.shape({
    type: PropTypes.string.isRequired,
    url: PropTypes.string,
    alt: PropTypes.string,
  }).isRequired,
};

// Leaf renderer for text formatting
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.code) {
    children = <code style={{ backgroundColor: '#f0f0f0', padding: '2px 4px', borderRadius: '3px' }}>{children}</code>;
  }
  return <span {...attributes}>{children}</span>;
};

Leaf.propTypes = {
  attributes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  leaf: PropTypes.object.isRequired,
};

// Main blog editor component
const EnhancedBlogEditor = ({ editMode = false }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { blogId } = useParams();

  // For demo purposes, set isAuthenticated to true
  // const { isAuthenticated } = useAuthContext();
  const isAuthenticated = true;

  // State for blog metadata
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('technology');
  const [tags, setTags] = useState('');
  const [previewMode, setPreviewMode] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  // Create a Slate editor with history and React plugins
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [content, setContent] = useState(initialValue);

  // Load existing blog data if in edit mode
  useEffect(() => {
    if (editMode && blogId) {
      // In a real app, you would fetch the blog data from an API or storage
      // For now, we'll simulate loading from localStorage
      try {
        const savedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
        const blog = savedBlogs.find(b => b.id === blogId);

        if (blog) {
          setTitle(blog.title);
          setCategory(blog.category);
          setTags(blog.tags.join(', '));
          setContent(JSON.parse(blog.content));
        }
      } catch (error) {
        console.error('Error loading blog data:', error);
      }
    }
  }, [editMode, blogId]);

  // Render element and leaf components
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  // Handle saving the blog
  const handleSaveBlog = () => {
    if (!title.trim()) {
      alert('Please enter a blog title');
      return;
    }

    const blogData = {
      id: editMode && blogId ? blogId : Date.now().toString(),
      title,
      category,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      content: JSON.stringify(content),
      createdAt: editMode && blogId ? undefined : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    try {
      // In a real app, you would send this data to an API
      // For now, we'll save to localStorage
      const savedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');

      if (editMode && blogId) {
        // Update existing blog
        const index = savedBlogs.findIndex(b => b.id === blogId);
        if (index !== -1) {
          savedBlogs[index] = { ...savedBlogs[index], ...blogData };
        }
      } else {
        // Add new blog
        savedBlogs.push(blogData);
      }

      localStorage.setItem('blogs', JSON.stringify(savedBlogs));
      navigate('/blogs');
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Failed to save blog. Please try again.');
    }
  };

  // Handle inserting an image
  const handleInsertImage = () => {
    const url = prompt('Enter image URL:');
    if (!url) return;

    const alt = prompt('Enter image description (alt text):');

    // Use Transforms.insertNodes instead of Editor.insertNodes
    Transforms.insertNodes(editor, {
      type: 'image',
      url,
      alt,
      children: [{ text: '' }],
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1">
            {editMode ? 'Edit Blog Post' : 'Create New Blog Post'}
          </Typography>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => setConfirmDialogOpen(true)}
          >
            Back to Blogs
          </Button>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {!previewMode ? (
          <>
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Blog Title"
                  variant="outlined"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    value={category}
                    label="Category"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <MenuItem value="technology">Technology</MenuItem>
                    <MenuItem value="finance">Finance</MenuItem>
                    <MenuItem value="career">Career</MenuItem>
                    <MenuItem value="personal">Personal</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Tags (comma separated)"
                  variant="outlined"
                  fullWidth
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="tech, react, web"
                />
              </Grid>
            </Grid>

            <Box
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                mb: 3
              }}
            >
              <Box
                sx={{
                  p: 1,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 0.5
                }}
              >
                <MarkButton format="bold" icon={<FormatBold />} />
                <MarkButton format="italic" icon={<FormatItalic />} />
                <MarkButton format="underline" icon={<FormatUnderlined />} />
                <MarkButton format="code" icon={<Code />} />
                <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
                <BlockButton format="heading-one" icon={<LooksOne />} />
                <BlockButton format="heading-two" icon={<LooksTwo />} />
                <BlockButton format="block-quote" icon={<FormatQuote />} />
                <BlockButton format="bulleted-list" icon={<FormatListBulleted />} />
                <BlockButton format="numbered-list" icon={<FormatListNumbered />} />
                <BlockButton format="code-block" icon={<Code />} />
                <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
                <Tooltip title="Insert Image">
                  <IconButton onClick={handleInsertImage} size="small">
                    <Image />
                  </IconButton>
                </Tooltip>
              </Box>

              <Box sx={{ p: 2, minHeight: '400px' }}>
                <Slate
                  editor={editor}
                  value={content}
                  onChange={setContent}
                >
                  <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    placeholder="Start writing your blog content here..."
                    spellCheck
                    style={{ minHeight: '400px' }}
                  />
                </Slate>
              </Box>
            </Box>
          </>
        ) : (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" gutterBottom>{title || 'Blog Title'}</Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip label={category} color="primary" size="small" />
              {tags.split(',').map((tag, index) => (
                tag.trim() && <Chip key={index} label={tag.trim()} size="small" />
              ))}
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ typography: 'body1' }}>
              {/* In a real app, you would render the Slate content here */}
              <Typography variant="body1">
                Preview mode would render the formatted content here.
              </Typography>
            </Box>
          </Box>
        )}

        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Button
            variant="outlined"
            startIcon={previewMode ? <Edit /> : <Preview />}
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
          <Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Save />}
              onClick={handleSaveBlog}
              sx={{ mr: 1 }}
            >
              {editMode ? 'Update' : 'Publish'} Blog
            </Button>
            {editMode && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
              >
                Delete
              </Button>
            )}
          </Box>
        </Stack>
      </Paper>

      {/* Confirmation dialog for navigating away */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>Discard changes?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have unsaved changes. Are you sure you want to leave this page? Your changes will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => navigate('/blogs')} color="error">
            Discard Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

EnhancedBlogEditor.propTypes = {
  editMode: PropTypes.bool
};

export default EnhancedBlogEditor;
