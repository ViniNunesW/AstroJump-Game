-- =========================================================================
-- SCRIPT DE MIGRAÇÃO: Criar tabela 'players' e atualizar 'leaderboard'
-- Execute este script no SQL Editor do seu painel do Supabase.
-- =========================================================================

-- 1. Criar a nova tabela de contas dos jogadores (players)
CREATE TABLE IF NOT EXISTS public.players (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    bio TEXT DEFAULT 'Astro Saltador!',
    best_score INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS para a tabela 'players'
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso para a tabela 'players'
CREATE POLICY "Permitir leitura pública de perfis" ON public.players FOR SELECT USING (true);
CREATE POLICY "Permitir cadastro público" ON public.players FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir atualização de perfil próprio" ON public.players FOR UPDATE USING (true);

-- 2. Atualizar a tabela 'leaderboard' existente
-- Limpa os dados antigos para evitar erros de integridade (opcional, mas recomendado)
TRUNCATE TABLE public.leaderboard;

-- Adiciona a coluna de relação 'player_id' vinculando-a com a tabela 'players'
ALTER TABLE public.leaderboard 
ADD COLUMN player_id UUID REFERENCES public.players(id) ON DELETE CASCADE NOT NULL;

-- Remove a coluna antiga 'username' (o username agora é lido a partir da tabela 'players')
ALTER TABLE public.leaderboard 
DROP COLUMN username;
