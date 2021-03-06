class StoriesController < ApplicationController
  before_action :set_story, only: [:show, :get_story, :edit, :update, :destroy]

  def index
    @stories = Story.all
    @story = Story.new
  end

  def show
    @speeds = Speed.all
  end

  def get_story
    render json: @story.get_lines.to_json
  end

  def new
    @story = Story.new
  end

  def edit
  end

  def create
    @story = Story.new(story_params)

    respond_to do |format|
      if @story.save
        format.html { redirect_to @story, notice: '' }
        format.json { render :show, status: :created, location: @story }
      else
        format.html { render :new }
        format.json { render json: @story.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @story.update(story_params)
        format.html { redirect_to @story, notice: 'Story was successfully updated.' }
        format.json { render :show, status: :ok, location: @story }
      else
        format.html { render :edit }
        format.json { render json: @story.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @story.destroy
    respond_to do |format|
      format.html { redirect_to stories_url, notice: 'Story was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

    def set_story
      @story = Story.find(params[:id])
    end


    def story_params
      params.require(:story).permit(:title, :author, :content)
    end
end
