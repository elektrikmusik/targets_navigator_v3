# Supabase Setup Guide

This guide will help you set up Supabase for your project.

## 1. Environment Variables

Create a `.env.local` file in the root directory with your Supabase credentials:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

## 2. Getting Your Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and sign in
2. Create a new project or select an existing one
3. Go to Settings > API
4. Copy the Project URL and anon/public key

## 3. Database Schema

The project includes a basic schema in `src/db/schema.ts` with:

- User table
- Territory table (for geographic data)
- TerritoryData table (for metrics)

## 4. Using Supabase MCP Tools

The project is configured to use Supabase MCP tools for:

- Database management
- Schema generation
- Data operations
- Project management

## 5. Available MCP Commands

- `mcp_supabase_list_projects` - List your Supabase projects
- `mcp_supabase_get_project` - Get project details
- `mcp_supabase_list_tables` - List database tables
- `mcp_supabase_execute_sql` - Execute SQL queries
- `mcp_supabase_apply_migration` - Apply database migrations
- `mcp_supabase_generate_typescript_types` - Generate TypeScript types

## 6. Next Steps

1. Set up your environment variables
2. Create your database tables using the MCP tools
3. Generate TypeScript types for your schema
4. Start using Supabase in your application
