class SpeedsController < ApplicationController

  def new
  	@speed = Speed.new
  end

  def create
  	@speed = Speed.create(speed_params)
  	redirect_to new_speed_path
  end

  private

    def set_speed
      @story = Story.find(params[:id])
    end


    def speed_params
      params.require(:speed).permit(:animal, :blurb, :delay)
    end

end
