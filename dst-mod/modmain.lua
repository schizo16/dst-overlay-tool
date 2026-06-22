local STATE_PATH = MODROOT .. "\\game-state.json"

local function write_game_state()
    local ok, err = pcall(function()
        local state = {
            season = "autumn",
            day = 1,
            phase = "day",
            stats = { hunger = 0, sanity = 0, health = 0, max_hunger = 150, max_sanity = 200, max_health = 150 },
            temperature = 25,
            moisture = 0,
            bosses = {},
        }

        if GLOBAL.TheWorld and GLOBAL.TheWorld.state then
            state.season = GLOBAL.TheWorld.state.season or "autumn"
            state.day = math.floor(GLOBAL.TheWorld.state.cycles or 1)
            state.phase = GLOBAL.TheWorld.state.phase or "day"
        end
        if GLOBAL.TheWorld and GLOBAL.TheWorld.components and GLOBAL.TheWorld.components.seasonmanager then
            local sm = GLOBAL.TheWorld.components.seasonmanager
            state.remainingdaysinseason = sm:GetDaysLeftInSeason() or 0
        end

        if GLOBAL.ThePlayer and GLOBAL.ThePlayer.components then
            local p = GLOBAL.ThePlayer
            if p.components.hunger then
                state.stats.hunger = math.floor(p.components.hunger.current or 0)
                state.stats.max_hunger = math.floor(p.components.hunger.max or 150)
            end
            if p.components.sanity then
                state.stats.sanity = math.floor(p.components.sanity.current or 0)
                state.stats.max_sanity = math.floor(p.components.sanity.max or 200)
            end
            if p.components.health then
                state.stats.health = math.floor(p.components.health.currenthealth or 0)
                state.stats.max_health = math.floor(p.components.health.maxhealth or 150)
            end
            if p.components.temperature then
                state.temperature = math.floor(p.components.temperature.current or 25)
            end
            if p.components.moisture then
                state.moisture = math.floor(p.components.moisture.current or 0)
            end
        end

        local json = GLOBAL.json.encode(state)
        local f = io.open(STATE_PATH, "w")
        if f then f:write(json); f:close() end
    end)
    if not ok then print("[DSTOverlay] " .. tostring(err)) end
end

AddSimPostInit(function()
    GLOBAL.TheWorld:DoPeriodicTask(3, write_game_state)
end)
