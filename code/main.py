import pygame

# --------------
# Initialization
# --------------
pygame.init()
clock = pygame.time.Clock()

# -----------
# Game Window
# -----------
WIDTH, HEIGHT = 600, 600
WIN = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Sudoku Solver")

# ------------------
# Colour Definitions
# ------------------
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
LIGHT_GREEN = (144, 238, 144)

# ---------------------------
# Grid Dimensions & Cell Size
# ---------------------------
grid_size = 9
cell_size = WIDTH // grid_size

# --------------------
# Empty Grid Creations
# --------------------
grid = [[0] * grid_size for _ in range(grid_size)]

# ---------
# Functions
# ---------
def draw_window(grid, grid_size):
    # draw the grid
    for i in range(grid_size):
        for j in range(grid_size):
            cell_value = str(grid[i][j])
            cell_rect = pygame.Rect(j*cell_size, i*cell_size, cell_size, cell_size)
            pygame.draw.rect(WIN, WHITE, cell_rect)
            pygame.draw.rect(WIN, BLACK, cell_rect, 1)
            if grid[i][j] != 0:
                font = pygame.font.Font(None, 30)
                text = font.render(cell_value, True, BLACK)
                text_rect = text.get_rect(center=cell_rect.center)
                WIN.blit(text, text_rect)
    pygame.display.update()
    clock.tick(60)

# ---------
# Game Loop
# ---------
running = True
def main_game(running):
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
        draw_window(grid, grid_size)

main_game(running)
pygame.quit()